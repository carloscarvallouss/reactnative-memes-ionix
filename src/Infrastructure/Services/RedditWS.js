import axios from "axios"

export const getMemes = ({ cancelSource, paginate = false, lastItem = "" }, res) => {

    let paginationString = paginate ? `&after=${lastItem}` : ``
    let url = `https://www.reddit.com/r/chile/new/.json?limit=100${paginationString}`

    axios.get(url, {
        cancelToken: cancelSource.token
    })
        .then(data => {
            if (data.data.data.children)
                res({ status: "ok", data: data.data.data.children })
            else
                res({ status: "ok", data: [] })
        })
        .catch(e => {
            console.log(e)
            if (e.message === "cancel")
                res({ status: "cancel", data: [] })
            else
                res({ status: "error", data: [] })
        })
}

export const searchMemes = ({ text, cancelSource, paginate, lastItem }, res) => {
    let paginationString = paginate ? `&after=${lastItem}` : ``
    let url = `https://www.reddit.com/r/chile/search.json?q=${text}&limit=100${paginationString}`
    axios.get(url, {
        cancelToken: cancelSource.token
    })
        .then(data => {
            res({ status: "ok", data: data.data.data.children })
        })
        .catch(e => {
            console.log(e)
            if (e.message === "cancel")
                res({ status: "cancel", data: [] })
            else
                res({ status: "error", data: [] })
        })
}