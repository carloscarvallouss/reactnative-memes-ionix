import axios from "axios"

export const getMemes = (req, res) => {
    axios.get("https://www.reddit.com/r/chile/new/.json?limit=100")
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