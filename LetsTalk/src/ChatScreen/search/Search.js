import "./Search.css"

function Search({ doSearch, searchBox }) {

    const search = function () {
        doSearch(searchBox.current.value);
    }

    return (
        <div className="input-group">
            <input ref={searchBox} onKeyUp={search} type="text" placeholder="Search..." name="" className="form-control search"></input>
            <span className="input-group-text search-btn"><i className="bi bi-search"></i></span>
        </div>
    );
}

export default Search;