
export const addLinks = paragraph => {
    const arreglo = paragraph.split(" ");
    let newText = "";
    arreglo.map(item => {
        if (item.includes("@") || item.includes("#") || item.includes("http")) {
            newText += `<span>${item}</span> `
        } else {
            newText += `${item} `
        }
    })
    return newText;
}