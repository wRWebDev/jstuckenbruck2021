import axios from 'axios'

const upload = async (bucket, file, setUploadStateTo, newFileName, num, total) => {
    
    console.log(`Running upload for ${newFileName}`)

    // Split for name and type
    let fileType = file.type

    setUploadStateTo(true)

    const process = axios
        .post(`/api/sign_s3`, {
            bucket,
            fileType,
            newFileName
        })
        .then(async res => {
            var returnData = res.data.data.returnData
            const { signedRequest } = returnData
            var options = {
                headers: {
                    'Content-Type': fileType
                },
            }
            await axios
                .put(signedRequest, file, options)
                .then(() => {
                    setUploadStateTo(false)
                    setTimeout(() => {
                        setUploadStateTo(false)
                    }, 3000)
                    return true
                })
                .catch(err => {
                    console.error(err.message)
                    setUploadStateTo(false)
                    return false
                })
        })
        .catch(err => {
            setUploadStateTo(false)
            return false
        })

        return await process
}

export default upload