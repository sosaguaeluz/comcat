import base64 from 'base-64'
import utf8 from 'utf8'

export function decode(value: string){
    let encoded = value;
    let bytes = base64.decode(encoded);
    let text = utf8.decode(bytes);
    return text
}