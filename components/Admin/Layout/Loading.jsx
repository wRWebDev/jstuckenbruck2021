const LoadingPage = () => {

    return (
        <div id="loadingPage">
            <h3>Loading...</h3>
            <div className="loadingCircle" />
        </div>
    )

}

const LoadingMore = () => {
    return(
        <div className="paginationStatus">
            <div className="loadingCircle" />
        </div>
    )
}

const FinishedLoading = () => {
    return (
        <div className="paginationStatus">
            <div className="finished" />
        </div>
    )
}

export {
    LoadingPage,
    LoadingMore,
    FinishedLoading
}