import axios from "axios"

export const getMemes = ({ cancelSource }, res) => {
    axios.get("https://www.reddit.com/r/chile/new/.json?limit=100", {
        cancelToken: cancelSource.token
    })
        .then(data => {
            if (data.data.data.children)
                res(data.data.data.children)
            else
                res([])
        })
        .catch(e => {
            res([])
        })
}

export const searchMemes = ({ text, cancelSource }, res) => {
    axios.get(`https://www.reddit.com/r/chile/search.json?q=${text}&limit=100`, {
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