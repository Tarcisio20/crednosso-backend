import { parse, format } from 'date-fns'


export const TransformData = (data : string) => {
        //const parsedDate = parse(data, 'dd/MM/yyyy', new Date())
        // const formatedDate  = format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss")
        const partesData = data.split('/') 
        const americanDt = `${partesData[2]}-${partesData[1]}-${partesData[0]}` 
        
        const dataAtual = new Date()
        const hora = dataAtual.getHours()
        const min = dataAtual.getMinutes()
        let sec = dataAtual.getSeconds()
        if(sec < 10) sec = parseInt('0'+sec)
        const horusFormatted = `${americanDt}T${hora}:${min}:${sec}.000Z`

        return horusFormatted



      //  2024-01-03 17:09:00.000
}