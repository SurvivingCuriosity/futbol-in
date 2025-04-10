// recibe Salamanca, Salamanca devuelve Salamanca_Salamanca
export const encodeCiudad = (ciudad:string) => {
    const municipio = ciudad.split(",")[0].trim()
    const provincia = ciudad.split(",")[1].trim()
    return encodeURIComponent(`${municipio}_${provincia}`)
}
// recibe Salamanca_Salamanca devuelve Salamanca, Salamanca
export const decodeCiudad = (ciudad:string) => {
    return decodeURIComponent(ciudad).split('_').join(', ')
}