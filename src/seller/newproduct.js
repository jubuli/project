import { useState } from "react";

const NewProduct = () => {
    let [productinfo, updataInfo] = useState({});
    let [nameError, setNameError] = useState("");
    let [priceError, setPriceError] = useState("");
    let [photoError, setPhotoError] = useState("");
    let [detailsError, setDetailsError] = useState("");

    const pickValue = (obj) => {
        productinfo[obj.target.name] = obj.target.value;
        updataInfo(productinfo);
    }
    const save = (obj) => {
        obj.preventDefault(); // it protect from page refresh
        let formStatus = true;
        if (!productinfo.pname || productinfo.pname == "") {
            setNameError("Enter product name!");
            formStatus = false
        } else {
            setNameError("");
        }
        /// price validation
        if (!productinfo.pprice || productinfo.pprice == "" || isNaN(productinfo.pprice)) {
            setPriceError("Entermvalid price!");
            formStatus = false
        } else {
            setPriceError("");
        }
        // photo url
        if (!productinfo.photo || productinfo.photo == "") {
            setPhotoError("Enter photo url !");
            formStatus = false
        } else {
            setPhotoError("");
        }
        // detail

        if (!productinfo.pdetails || productinfo.pdetails == "") {
            setDetailsError("Enter product details!");
            formStatus = false
        } else {
            setDetailsError("");
        }
        if (formStatus == true) {
            alert("please wait sending to server")
            let url = "http://localhost:1234/productapi";
            let postdate = {
                headers: { 'content-Type': 'application/json' },
                method: "post",
                body: JSON.stringify(productinfo)

            }
            fetch(url,postdate)
                .then(response => response.json())
                .then(info => {
                    alert(productinfo.pname + "save Sucessfully !");
                    obj.target.reset(); // it clear the form

                })
        }
    }
    return (
        <div className="container mt-4" >
            <form onSubmit={save} >
                <div className="row" >
                    <div className="col-lg-12 text-center mb-3"  >
                        <h3 className="text-info"> Enter product Detasils</h3>
                        <small className="text-danger"> The * marked field are mandatory </small>
                    </div>
                    <div className="col-lg-4 mb-4">
                        <p> product name <small className="text-danger">*</small></p>
                        <input type="text " className="form-control" name="pname" onChange={pickValue} />
                        <small className="text-danger">{nameError}</small>
                    </div>

                    <div className="col-lg-4 mb-4">
                        <p> product price <small className="text-danger">*</small></p>
                        <input type="text " className="form-control" name="pprice" onChange={pickValue} />
                        <small className="text-danger">{priceError}</small>
                    </div>

                    <div className="col-lg-4 mb-4">
                        <p> product photo url  <small className="text-danger">*</small> </p>
                        <input type="text " className="form-control" name="photo" onChange={pickValue} />
                        <small className="text-danger">{photoError}</small>
                    </div>

                    <div className="col-lg-12 mb-4">
                        <p> product description  <small className="text-danger">*</small> </p>
                        <textarea type="text " className="form-control" name="pdetails" onChange={pickValue} ></textarea>
                        <small className="text-danger">{detailsError}</small>
                    </div>
                    <div className="col-lg-12 text-center">
                        <button className="btn btn-success m-2" type="submit">save product</button>
                        <button className="btn btn-success m-2" type="reset">clear all</button>

                    </div>

                </div>
            </form>
        </div>
    )

}
export default NewProduct;