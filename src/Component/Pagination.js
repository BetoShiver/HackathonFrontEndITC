import React from 'react'

export default function Pagination({listPerPage, totalList, paginate}) {

    const pageNumber = [];

    for (let index = 1; index <= Math.ceil(totalList / listPerPage); index++) {
        pageNumber.push(index);
    }
    return (
        <nav className="mx-5 mt-3">
            <ul className = "pagination justify-content-center mx-5">
                {pageNumber.map(number => (
                    <li key = {number} className = "page-item">
                        <a onClick = {() => paginate(number)} href= "#" className = "page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
