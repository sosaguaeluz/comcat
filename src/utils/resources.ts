import states_cities from "../resources/states-cities.json";

export type TOptions = { label: string; value: any };

export const getStates = (): TOptions[] => {
  return states_cities.estados?.map((item) => ({
    label: item.nome,
    value: item.sigla,
  }));
};

export const getCities = (state: string): TOptions[] => {
  const cities = states_cities?.estados?.find((item) => item.sigla === state);
  return cities?.cidades?.map((value) => ({ label: value, value })) || [];
};

export const getAllCities = (): TOptions[] => {
  let newCities: TOptions[] = [];

  states_cities.estados?.map((item) => {
    newCities.push(...getCities(item.sigla));
  });

  return newCities.sort((a, b) =>
    a.label < b.label ? -1 : a.label > b.label ? 1 : 0
  );
};

export const convertNameToSiglaState = (longName?: string | null): string => {
  if (!longName || longName === null) return "";
  return (
    states_cities.estados?.find((item) => item.nome === longName)?.sigla ||
    longName
  );
};

export const convertStateSiglaToLongName = (sigla?: string | null): string => {
  if (!sigla || sigla === null) return "";
  return (
    states_cities.estados?.find((item) => item.sigla === sigla)?.nome || sigla
  );
};