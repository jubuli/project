import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const MyHome = () => {
    let [allproduct, setProduct] = useState([]);
    let [ordericon, setIcon] = useState("fa fa-arrow-up");
    let [order, setOrder] = useState("asc");

    const getProduct = () => {
        fetch("http://localhost:1234/productapi")
            .then(response => response.json())
            .then(pArray => {

                if (order == "asc") {
                    pArray.sort((a, b) => a.pprice - b.pprice);
                    setProduct(pArray);
                    setOrder("desc");
                    setIcon("fa fa-arrow-up");
                } else {
                    pArray.sort((a, b) => b.pprice - a.pprice);
                    setProduct(pArray);
                    setOrder("asc");
                    setIcon("fa fa-arrow-down")
                }
            })
    }

    useEffect(() => {
        getProduct();
    }, []);

    let [keyword, setKeyword] = useState("")
    const PER_PAGE = 4; //displays 5 items/records per page
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(allproduct.length / PER_PAGE);
    const addincart=(Product)=>{
     
        Product["qty"]=1;
        let url="http://localhost:1234/cartapi";
        let postdata={
            headers:{'Content-Type':'application/json'},
            method:'post',
            body:JSON.stringify(Product)
        }
        try{
        fetch(url,postdata)
        .then(response=>response.json())
        .then(pinfo=>{
            alert(pinfo.pname +"Added in your Cart")
        })
    }catch(error){
      alert("Techical Error.Try in sometime");
    }
    
     
    }
    return (
        <div className="container mt-4" >
            <div className="row mb-4">
                <div className="col-lg-2"></div>

                <div className="col-lg-5 mb-2">
                    <input type="text" className="form-control" placeholder="search..."
                        onChange={obj => setKeyword(obj.target.value)} />
                </div>
                <div className="col-lg-1"></div>
                <div className="col-lg-3">
                    <select className="form-select" onChange={getProduct} >
                        <option> priceLow to High</option>
                        <option> price High to Low</option>
                    </select>
                </div>
            </div>
            <div className="row mt-5" >


                {
                    allproduct.slice(offset, offset + PER_PAGE).map((Product, index) => {
                        if (Product.pname.toLowerCase().match(keyword.toLowerCase()) || Product.pprice.toString().match(keyword))  //keyword check kariba pname re keu laterr asichhi seta smmal kibig sir na nuha
                            return (
                                <div className="col-xl-3 mb-4 " key={index} >
                                    <div className="p-3 shadow">
                                        <h4 className="text-primary mb-3"> {Product.pname} </h4>
                                        <img src={Product.photo} width="100%" height="190" />
                                      
                                        <p className="mt-3 text-danger" > <i className="fa fa-rupee text-primary"></i>.{Product.pprice} </p>
                                        <p className="mt-3" >{Product.pdetails.slice(0,30)} </p>
                                        <p> <button className="btn btn-warning btn-sm" onClick={addincart.bind(this,Product)} ><i className="fa fa-shopping-cart">Add to cart</i></button></p>
                                    </div>
                                </div>
                            )
                    })
                }


            </div>
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

        </div >
    )
}
export default MyHome;
