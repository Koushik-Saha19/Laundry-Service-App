import React, { PureComponent } from "react";
import ProductDataService from "../service/ProductDataService";
import ReviewService from "../service/ReviewService";
import "./Table.css";

class ListProductComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      product: [],
      //reviews:[],
      message: "",
      productId: " ",

      ReviewId:"ReviewId",
      Review:"Review",
      Rating:"Rating",
      Update_Review:"Update Review",
      Delete_Review:"Delete Review"


    };
    this.refreshProduct = this.refreshProduct.bind(this);
    this.deleteProductClick = this.deleteProductClick.bind(this);
    this.updateProductClick = this.updateProductClick.bind(this);
    this.searchProductClick = this.searchProductClick.bind(this);
    this.stateChanger= this.stateChanger.bind(this);
  }

  componentWillMount() {
    this.refreshProduct();
    this.stateChanger();
  }
  refreshProduct() {
    ProductDataService.getAllProducts().then(response => {
      this.setState({
        product: response.data
        // reviews: response.data.reviews
      });
    });
  
  }
stateChanger(productId){

if(ReviewService.getAllReviews(productId)=="[]")
  {
    this.setState({
      ReviewId:"",
      Review:"",
      Rating:"",
      Update_Review:"",
      Delete_Review:""
    })
  }
}


  deleteProductClick(productIdToDelete) {
    ProductDataService.deleteProduct(productIdToDelete).then(response => {
      this.setState({
        message: "Product Id " + productIdToDelete + " deleted successfully"
      });
      this.refreshProduct();
    });
  }
  updateProductClick(productId) {
    this.props.history.push(`/product/${productId}`);
    
  }
  searchProductClick() {
    this.props.history.push(`/product/search/searchProduct/`);
  }

  addReviewClick(productId, reviewId) {
    this.props.history.push(
      `/product/review/prodId=/${productId}/rId=/${reviewId}`
    );
  }
  deleteReviewClick(productId_Of_Review, reviewIdToDelete) {
    ReviewService.deleteReview(productId_Of_Review, reviewIdToDelete).then(
      response => {
        this.setState({
          message:
            "Review for Product Id " +
            productId_Of_Review +
            " with Review Id " +
            reviewIdToDelete +
            " deleted successfully."
        });
        this.refreshProduct();
      }
    );
  }
  updateReviewClick(productId_Of_Review, reviewIdToDelete) {
    this.props.history.push(
      `/product/review/prodId=/${productId_Of_Review}/rId=/${reviewIdToDelete}`
    );
  }
  render() {
    return (
      <div>
        <h3>
          <center>All Products for you</center>
        </h3>
        <div className="container">
          {this.state.message && (
            <div className="alert alert-success">{this.state.message}</div>
          )}

          <table className="Table" border="5" cellPadding="30" className="table table-hover ">
            <thead>
              <tr>
                <th>
                  Product<br></br>ID
                </th>
                <th>
                  Product<br></br>Name
                </th>
                <th>
                  Quantity<br></br>On Hand
                </th>
                <th>Price</th>
                <th>Delete</th>
                <th>Update</th>

                <th colSpan="4">
                  <center>Review</center>
                </th>
              </tr>
            </thead>

            <tbody>
              {this.state.product.map(product => (
                <tr key={product.productId}>
                  <td>{product.productId}</td>
                  <td>{product.productName}</td>
                  <td>{product.quantityOnHand}</td>
                  <td>{product.price}</td>

                  <td colSpan="1">
                    <button
                      className="btn btn-danger"
                      onClick={() => this.deleteProductClick(product.productId)}
                    >
                      Delete
                    </button>
                  </td>

                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => this.updateProductClick(product.productId)}
                    >
                      Update
                    </button>
                  </td>

                  <td colSpan="4" >
                    <table cellPadding="10" cellSpacing="10">
                      <thead>
                        <tr onLoad={()=>this.stateChanger(product.productId)}>
                          <th>{this.state.ReviewId}</th>
                          <th>{this.state.Review}</th>
                          <th>{this.state.Rating}</th>
                          <th>{this.state.Delete_Review}</th>
                          <th>{this.state.Update_Review}</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                      {product.reviews.map(review => (
                          <tr key={review.reviewId}>
                            <td>{review.reviewId}</td>
                            <td>{review.review}</td>
                            <td>{review.reviewRating}</td>
                            <td colSpan="1" >
                              <button 
                                className="btn btn-danger"
                                onClick={() =>
                                  this.deleteReviewClick(
                                    product.productId,
                                    review.reviewId
                                  )
                                }
                              >
                                Delete
                              </button>
                            </td>

                            <td>
                              <button
                                className="btn btn-secondary"
                                onClick={() =>
                                  this.updateReviewClick(
                                    product.productId,
                                    review.reviewId
                                  )
                                }
                              >
                                Update
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <br></br>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          this.addReviewClick(product.productId, -1)
                        }
                      >
                        Add Review
                      </button>
                    </table>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br></br>

        <table cellSpacing="20" cellPadding="20">
          <tr>
            <td></td>
            <td></td>
            <td>
              <button
                className="btn btn btn-success"
                onClick={() => this.updateProductClick(-1)}
              >
                Add Product
              </button>
            </td>

            <td>
              <button
                className="btn btn-success"
                onClick={() => this.searchProductClick()}
              >
                Search Product By Name
              </button>
            </td>
          </tr>{" "}
        </table>
      </div>
    );
  }
}

export default ListProductComponent;
