const dades_usuaris = [
    {
        id: 1,
        nombre: "Yehor",
        contrasenya: "1234",
    },
]

if (!localStorage.getItem('dades_usuaris')) {
    localStorage.setItem('dades_usuaris', JSON.stringify(dades_usuaris));
}

export default dades_usuaris;