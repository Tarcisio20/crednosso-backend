export const TransformData = (data : string) => {

        const partesData = data.split('/') 
        const americanDt = `${partesData[2]}-${partesData[1]}-${partesData[0]}` 
        
        const dataAtual = new Date()
        const hora = dataAtual.getHours()
        const min = dataAtual.getMinutes()
        let sec = dataAtual.getSeconds()
        if(sec < 10) sec = parseInt('0'+sec)
        const horusFormatted = `${americanDt}T${hora}:${min}:${sec}.000Z`

        return horusFormatted
}