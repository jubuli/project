import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";


const MyOrder = () => {

    let [allorder, setOrder] = useState([])
    const getOrder = () => {
        fetch("http://localhost:1234/orderapi")
            .then(response => response.json())
            .then(pArray => {
                setOrder(pArray.reverse());
            })
    }

    useEffect(() => {

        getOrder();
    }, [])
    const PER_PAGE = 4; //displays 5 items/records per page
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(allorder.length / PER_PAGE);
    return (
        <div className="container  mt-4">
            <div className="row mb-4">
                <div className="col-lg-12">
                    <h1 className="text-center" >manage Order : {allorder.length}</h1>
                </div>
            </div>
            {
                allorder.slice(offset, offset + PER_PAGE).map((product, index) => {
                    return (
                        <div className="row mb-4  shadow p-3" key={index}>
                            <div className="col-lg-3">
                                <b>{product.cname}</b>
                                <p> mobile No: {product.mobile}</p>
                                <p>e-mail id: {product.email}</p>
                                <p>address:{product.address}</p>

                            </div>
                            <div className="col-lg-9">
                                <h5 className="text-center text-danger mb-3">
                                    order id :{product.id},data-{product.orderdate}
                                </h5>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>item Name</th>
                                            <th> Photo</th>
                                            <th>price</th>
                                            <th>Quantity</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            product.myproduct.map((product, index) => {

                                                return (
                                                    <tr key={index}>
                                                        <td> {product.pname}</td>
                                                        <td><img src={product.photo} height='30' width='40' /></td>
                                                        <td> {product.pprice}</td>
                                                        <td>

                                                            {product.qty}

                                                        </td>
                                                        <td> {product.pprice * product.qty}</td>


                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                })
            }

            <div className="mt-4 text-center">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination  justify-content-center"}
                    pageClassName={"page-item "}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active primary"}
                />
            </div>

        </div>

    )
}
export default MyOrder;