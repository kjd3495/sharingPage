import React from 'react'


const SearchPagination = ({ postsPerPage, totalPosts, currentPage, paginate }) => {
const pageNumbers = [];

for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
}

    return (
        <nav style={{display:"flex", justifyContent:"center"}}>
            <ul className="pagination justify-content-center" style={{textAligin:"center"}}>
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <span onClick={() => paginate(number)} className="page-link" style={currentPage == number ? {color: '#17a2b8'} : null}>
                            {number}
                        </span>
                    </li>
                ))}
            </ul>
        </nav>
    )
}



export default SearchPagination