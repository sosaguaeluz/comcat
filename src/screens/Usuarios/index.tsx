import React, { useEffect, useState } from "react";
import * as S from "./style";
import NewUser from "./NewUser";
import EditUser from "./EditUser";
import ManageUser from "./ManageUser";
import {
    CustomSelect,
    DefaultButton,
    DoubleButton,
    Search,
    Pagination,
    CustomTolltip,
    Poppover,
    ModalDelete,
    ModalMsg,
    DropDown,
} from "../../components";
import {
    api,
    useUf,
    queryClient,
    useUsers,
    useDashboardRegionUsers,
} from "../../services";
import { useSelector } from "react-redux";
import { RootState } from "../../stores";
import { useMutation } from "react-query";
import {
    iconShow,
    alertDark,
    trusted,
    noTrusted,
    userIcon,
} from "../../assets";
import { BREED, GENRE, } from "../../constants/index";
import { regex } from "../../services/functions/regex";
import { Grid } from "@mui/material";
import { User } from "../../@types";

const Usuarios: React.FC = () => {
    const { token } = useSelector((state : RootState) => state.clickState);
    const { data: dataUf} = useUf();
    const { data: regionUsers } = useDashboardRegionUsers(token);
    
    const [idUser, setIdUser] = useState<any>();
    const [objUser, setObjUser] = useState<any>(null);

    const [totalList, setTotalList] = useState<any>();
    const [totalUsers, setTotalUsers] = useState<any>();

    const [open, setOpen] = useState(false);
    const [app, setApp] = useState(true);
    const [panel, setPanel] = useState(false);
    const [editUser, setEditUser] = useState(false);
    const [manageUser, setManageUser] = useState(false);

    const [showDelete, setShowDelete] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [page, setPage] = useState<number>(1);
    const [user, setUser] = useState<any>(undefined);
    const [genre, setGenre] = useState<any>(undefined);
    const [breed, setBreed] = useState<any>(undefined);
    const [ufValue, setUfValue] = useState<any>(undefined);
    const [role, setRole] = useState<any>('Administrador');

    const deleteUser = async ({...obj}: User):Promise<User> => {
        const resp = await api.delete<User>(`/users/${obj.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return resp.data
    };


    const { mutate, isLoading } = useMutation(deleteUser, {
        onSuccess: () => {
            queryClient.invalidateQueries("users");
            setShowDelete(false);
            setShowSuccess(true);
            refetch();
        },
    });

    useEffect(() => {
        let spam: any = [];
        let sum = 0;

        regionUsers?.forEach((e) => {
            e.state_list?.forEach((id) => {
                spam.push({
                    name: id.name,
                    user_total: id.user_total,
                });
            });
        });

        spam.sort(function (a: any, b: any) {
            let x = a.name.toUpperCase(),
                y = b.name.toUpperCase();
            return x === y ? 0 : x > y ? 1 : -1;
        });

        regionUsers?.forEach((total) => (sum += total.user_total));

        setTotalUsers(sum);
        setTotalList(spam);
    }, []);

    const {
        data: users,
        refetch,
    } = useUsers(
        token,
        "DESC",
        page,
        10,
        user === '' ? undefined : user,
        breed === '' ? undefined : breed,
        genre === '' ? undefined : genre,
        ufValue === '' ? undefined : ufValue,
        role  === '' ? undefined : role
    );

    console.log(regionUsers, idUser, 'search teste');
    
    return (
        <>
            <S.Nav>
                <div>
                    <DoubleButton
                        id="ButtonUsuarioApp"
                        text="Usuários do aplicativo"
                        selected={app}
                        onSelect={() => {
                            setApp(true);
                            setPanel(false);
                            setRole('Administrador')
                        }}
                    />
                    <DoubleButton
                        id="ButtonUsuarioPainel"
                        text="Usuários do painel"
                        selected={panel}
                        onSelect={() => {
                            setApp(false);
                            setPanel(true);
                            setRole('Mobile')
                        }}
                    />
                </div>
                {panel === true && (
                    <DefaultButton
                        id="ButtonCadastrarMod"
                        onSelect={() => setOpen(!open)}
                        text="Cadastrar moderador"
                    />
                )}
            </S.Nav>
            <>
                {app === true && (
                    <>
                        <S.CardList>
                            <Grid container spacing={2.5} flex-wrap="wrap">
                                <Grid item xs={6} sm={4} md={4} lg xl>
                                    <DropDown
                                        key="Total"
                                        icon={userIcon}
                                        title="Total"
                                        value={totalUsers}
                                        type="list"
                                        width="100%"
                                        list={totalList}
                                    />
                                </Grid>
                                {regionUsers?.map((id: any) => {
                                    return (
                                        <Grid item xs={6} sm={4} md={4} lg xl>
                                            <DropDown
                                                key={id.name}
                                                icon=""
                                                title={id.name}
                                                value={id.user_total}
                                                type="list"
                                                width="100%"
                                                list={id.state_list}
                                            />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </S.CardList>
                        <S.Container>
                            <S.SearchInputsApp>
                                <Grid
                                    container
                                    spacing={3}
                                    flex-wrap="wrap"
                                    alignItems="center"
                                >
                                    <Grid
                                        item
                                        xs={6}
                                        sm={6}
                                        md={12}
                                        lg={3}
                                        xl={3}
                                    >
                                        <p>
                                            Usuários cadastrados no aplicativo
                                        </p>
                                    </Grid>
                                    <Grid item xs sm md lg xl>
                                        <Search
                                            onChange={(e) => {
                                                setUser(e.target.value);
                                            }}
                                            width="100%"
                                        />
                                    </Grid>
                                    <Grid item xs sm md lg xl>
                                        <span>
                                            <CustomSelect
                                                width={176}
                                                id="Raça"
                                                label="Raça"
                                                labelDefault='Todas as raças'
                                                value={breed}
                                                defaultValue="Todas"
                                                list={BREED}
                                                onChange={(e) => {
                                                    setBreed(e.target.value);
                                                }}
                                            />
                                            <CustomSelect
                                                width={176}
                                                id="Genero"
                                                label="Genero"
                                                labelDefault='Todos os generos'
                                                value={genre}
                                                defaultValue='Todos'
                                                list={GENRE}
                                                onChange={(e) => {
                                                    setGenre(e.target.value);
                                                }}
                                            />
                                            <CustomSelect
                                                width={255}
                                                id="Estado"
                                                label="Estado"
                                                labelDefault='Todos os estados'
                                                value={ufValue}
                                                defaultValue="Todos os estados"
                                                list={dataUf}
                                                onChange={(e) => {
                                                    setUfValue(e.target.value);
                                                }}
                                            />
                                        </span>
                                    </Grid>
                                </Grid>
                            </S.SearchInputsApp>
                            <S.ScrollDiv>
                                <S.Table>
                                    <S.TableHead>
                                        <tr>
                                            <th style={{ width: "250px" }}>
                                                <span
                                                    style={{
                                                        marginLeft: "24px",
                                                    }}
                                                >
                                                    Nome / Apelido
                                                    <button>
                                                        <img
                                                            src={iconShow}
                                                            alt=""
                                                        />
                                                    </button>
                                                </span>
                                            </th>
                                            <th style={{ width: "170px" }}>
                                                <span>Telefone</span>
                                            </th>
                                            <th
                                                style={{
                                                    width: "auto",
                                                    minWidth: "300px",
                                                }}
                                            >
                                                <span>E-mail</span>
                                            </th>
                                            <th style={{ width: "190px" }}>
                                                <span>
                                                    Estado
                                                    <button>
                                                        <img
                                                            src={iconShow}
                                                            alt=""
                                                        />
                                                    </button>
                                                </span>
                                            </th>
                                            <th style={{ width: "200px" }}>
                                                <span>
                                                    Cidade
                                                    <button>
                                                        <img
                                                            src={iconShow}
                                                            alt=""
                                                        />
                                                    </button>
                                                </span>
                                            </th>
                                            <th style={{ width: "130px" }}>
                                                <span>
                                                    Status
                                                    <button>
                                                        <img
                                                            src={iconShow}
                                                            alt=""
                                                        />
                                                    </button>
                                                </span>
                                            </th>
                                            <th style={{ width: "190px" }}>
                                                <span>
                                                    Confiabilidade
                                                    <span>
                                                        <CustomTolltip
                                                            img={
                                                                <img
                                                                    src={
                                                                        alertDark
                                                                    }
                                                                    alt=""
                                                                />
                                                            }
                                                            placement="top"
                                                            title="Usuários que são marcados como não confiáveis precisarão passar pela aprovação dos moderadores antes de serem publicadas"
                                                        />
                                                    </span>
                                                </span>
                                            </th>
                                            <th style={{ width: "90px" }}>
                                                <span
                                                    style={{
                                                        marginRight: "24px",
                                                    }}
                                                >
                                                    Ações
                                                </span>
                                            </th>
                                        </tr>
                                    </S.TableHead>
                                    <tbody>
                                        {users?.data?.map((id: any) => {
                                            return (
                                                <tr>
                                                    <td
                                                        style={{
                                                            width: "250px",
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                marginLeft:
                                                                    "24px",
                                                            }}
                                                        >
                                                            {id.name}
                                                        </span>
                                                    </td>
                                                    <td
                                                        style={{
                                                            width: "170px",
                                                        }}
                                                    >
                                                        <span>
                                                            {regex(
                                                                id.phone_number
                                                            )}
                                                        </span>
                                                    </td>
                                                    <td
                                                        style={{
                                                            width: "auto",
                                                            minWidth:
                                                                "300px",
                                                        }}
                                                    >
                                                        <span>
                                                            {id.email}
                                                        </span>
                                                    </td>
                                                    <td
                                                        style={{
                                                            width: "190px",
                                                        }}
                                                    >
                                                        <span>
                                                            {id.state}
                                                        </span>
                                                    </td>
                                                    <td
                                                        style={{
                                                            width: "200px",
                                                        }}
                                                    >
                                                        <span>
                                                            {id.city}
                                                        </span>
                                                    </td>
                                                    <td
                                                        style={{
                                                            width: "130px",
                                                        }}
                                                    >
                                                        <S.Active
                                                            active={
                                                                id.active
                                                            }
                                                        >
                                                            {id.active ===
                                                            true
                                                                ? "Ativo"
                                                                : "Inativo"}
                                                        </S.Active>
                                                    </td>
                                                    <td
                                                        style={{
                                                            width: "190px",
                                                        }}
                                                    >
                                                        <S.Trusted
                                                            trusted={
                                                                id.trusted
                                                            }
                                                        >
                                                            <img
                                                                width="20px"
                                                                src={
                                                                    id.trusted ===
                                                                    true
                                                                        ? trusted
                                                                        : noTrusted
                                                                }
                                                                alt={
                                                                    id.trusted ===
                                                                    true
                                                                        ? "Confiável"
                                                                        : "Não confiável"
                                                                }
                                                            />
                                                            {id.trusted ===
                                                            true
                                                                ? "Confiável"
                                                                : "Não confiável"}
                                                        </S.Trusted>
                                                    </td>
                                                    <td
                                                        style={{
                                                            width: "90px",
                                                        }}
                                                    >
                                                        <span>
                                                            <S.Options>
                                                                <Poppover
                                                                    onClick={() => {}}
                                                                    onDelete={() => {
                                                                        setShowDelete(
                                                                            !false
                                                                        );
                                                                        setIdUser(
                                                                            id.id
                                                                        );
                                                                    }}
                                                                    onEdit={() => {
                                                                        setManageUser(
                                                                            !manageUser
                                                                        );
                                                                        setObjUser(
                                                                            id
                                                                        );
                                                                        setIdUser(id);
                                                                    }}
                                                                    type={
                                                                        "userApp"
                                                                    }
                                                                />
                                                            </S.Options>
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </S.Table>
                            </S.ScrollDiv>
                        </S.Container>
                    </>
                )}
                {panel === true && (
                    <>
                        <S.Container>
                            <S.SearchInputsPanel>
                                <p>Usuários cadastrados no painel</p>
                                <Search onChange={(e) => {setUser(e?.target?.value)}} width="100%" />
                            </S.SearchInputsPanel>
                            <S.ScrollDiv>
                                <S.Table>
                                    <S.TableHead>
                                        <tr>
                                            <th style={{ width: "250px" }}>
                                                <span
                                                    style={{
                                                        marginLeft: "24px",
                                                    }}
                                                >
                                                    Nome do moderador
                                                    <button>
                                                        <img
                                                            src={iconShow}
                                                            alt=""
                                                        />
                                                    </button>
                                                </span>
                                            </th>
                                            <th style={{ width: "170px" }}>
                                                <span>Telefone</span>
                                            </th>
                                            <th
                                                style={{
                                                    width: "auto",
                                                    minWidth: "300px",
                                                }}
                                            >
                                                <span>E-mail</span>
                                            </th>
                                            <th style={{ width: "190px" }}>
                                                <span>
                                                    Estado
                                                    <button>
                                                        <img
                                                            src={iconShow}
                                                            alt=""
                                                        />
                                                    </button>
                                                </span>
                                            </th>
                                            <th style={{ width: "200px" }}>
                                                <span>
                                                    Cidade
                                                    <button>
                                                        <img
                                                            src={iconShow}
                                                            alt=""
                                                        />
                                                    </button>
                                                </span>
                                            </th>
                                            {/* <th style={{ width: '239px' }}>
                                                <span>
                                                    Tipo de acesso
                                                </span>
                                            </th> */}
                                            <th style={{ width: "130px" }}>
                                                <span>
                                                    Status
                                                    <button>
                                                        <img
                                                            src={iconShow}
                                                            alt=""
                                                        />
                                                    </button>
                                                </span>
                                            </th>
                                            <th style={{ width: "90px" }}>
                                                <span
                                                    style={{
                                                        marginRight: "24px",
                                                    }}
                                                >
                                                    Ações
                                                </span>
                                            </th>
                                        </tr>
                                    </S.TableHead>
                                    {users?.data?.map((id: any) => {
                                        return (
                                            <tbody>
                                                <tr>
                                                    <td
                                                        style={{
                                                            width: "250px",
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                marginLeft:
                                                                    "24px",
                                                            }}
                                                        >
                                                            {id.name}
                                                        </span>
                                                    </td>
                                                    <td
                                                        style={{
                                                            width: "170px",
                                                        }}
                                                    >
                                                        <span>
                                                            {regex(
                                                                id.phone_number
                                                            )}
                                                        </span>
                                                    </td>
                                                    <td
                                                        style={{
                                                            width: "auto",
                                                            minWidth:
                                                                "300px",
                                                        }}
                                                    >
                                                        <span>
                                                            {id.email}
                                                        </span>
                                                    </td>
                                                    <td
                                                        style={{
                                                            width: "190px",
                                                        }}
                                                    >
                                                        <span>
                                                            {id.state}
                                                        </span>
                                                    </td>
                                                    <td
                                                        style={{
                                                            width: "200px",
                                                        }}
                                                    >
                                                        <span>
                                                            {id.city}
                                                        </span>
                                                    </td>
                                                    {/* <S.Role role={id.role}  style={{ width: '239px' }}>
                                                        <span>
                                                            {id.role === "Administrador" ? `${id.role}` : `${id.role}`}
                                                        </span>
                                                    </S.Role> */}
                                                    <td
                                                        style={{
                                                            width: "130px",
                                                        }}
                                                    >
                                                        <S.Active
                                                            active={
                                                                id.active
                                                            }
                                                        >
                                                            {id.active ===
                                                            true
                                                                ? "Ativo"
                                                                : "Inativo"}
                                                        </S.Active>
                                                    </td>
                                                    <td
                                                        style={{
                                                            width: "90px",
                                                        }}
                                                    >
                                                        <span>
                                                            <S.Options>
                                                                <Poppover
                                                                    onClick={() => {}}
                                                                    onDelete={() => {
                                                                        setShowDelete(
                                                                            !false
                                                                        );
                                                                        setIdUser(id);
                                                                    }}
                                                                    onEdit={() => {
                                                                        setEditUser(
                                                                            !editUser
                                                                        );
                                                                        setObjUser(
                                                                            id
                                                                        );
                                                                        setIdUser(
                                                                            id.id
                                                                        );
                                                                    }}
                                                                    type={
                                                                        "userPanel"
                                                                    }
                                                                />
                                                            </S.Options>
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        );
                                    })}
                                </S.Table>
                            </S.ScrollDiv>
                        </S.Container>
                    </>
                )}
            </>
            <Pagination
                onPage={(e: any) => {
                    setPage(e);
                }}
                value={page}
            />
            <NewUser isModal={open} onClose={() => setOpen(!open)} />
            <ManageUser
                isModal={manageUser}
                onClose={() => {
                    setManageUser(!manageUser);
                    setObjUser(null);
                }}
                itemEdit={objUser}
            />
            <EditUser
                isModal={editUser}
                onClose={() => {
                    setEditUser(!editUser);
                    setObjUser(null);
                }}
                itemEdit={objUser}
            />
            <ModalDelete
                backgroundColor="false"
                mensage="Deseja mesmo excluir este usuário?"
                onClose={() => setShowDelete(false)}
                onDelete={() => {
                    mutate(idUser);
                    refetch();
                }}
                open={showDelete}
                width={469}
                buttonText={
                    isLoading === false ? "Sim, excluir" : "Excluindo..."
                }
            />
            <ModalMsg
                height="312px"
                modalBackground={false}
                mensage="O usuário foi excluido com sucesso!"
                onClose={() => {
                    setShowSuccess(false);
                    setShowDelete(false);
                    refetch();
                }}
                open={showSuccess}
                status="success"
                width={469}
            />
        </>
    );
};

export default Usuarios;
