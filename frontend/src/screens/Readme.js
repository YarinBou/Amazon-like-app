import React from "react";

export default function HomeScreen() {
  return (
    <div>
      <div>
        <h1> Yarin Michael Bouzaglo - 313566747 </h1>{" "}
      </div>{" "}
      <div>
        <ol>
          <li>
            Store name: <b> Sticker 'sForGeeks</b>{" "}
          </li>{" "}
          <li>
            What are you selling ? <b> Sticker 's For Geeks.</b>{" "}
          </li>{" "}
          <li>
            What additional page(s) did you add ? How to operate it ? {" "}
            <b>
              our additional pages are :
              <ol>
                <li> WishListScreen - click on the heart icon after login. </li>{" "}
                <li>
                  ProudactScreen - click on any proudact on the Home Screen.{" "}
                </li>{" "}
                <li>
                  ShippingScreen - click Proceed to Checkout in http : /cart{" "}
                </li>{" "}
                <li>
                  PaymentMethodScreen - click Continue in http : /shipping{" "}
                </li>{" "}
                <li>
                  AddProductScreen - on admin view get in http: /admin/activity
                  then click Add a product in /admin/add{" "}
                </li>{" "}
                <li>
                  AddReviewScreen - on product screen click Add Your Review in
                  /addReview/ 4{" "}
                </li>{" "}
                <li>
                  AddReviewScreen - on admin view get in http: /admin/activity
                  then click Delete a product in /admin/delete{" "}
                </li>{" "}
              </ol>{" "}
            </b>{" "}
          </li>{" "}
          <li> What was hard to do ? </li> 
          <b>
            What was difficult for me to make it:
            <ol>
              <li>
                Working without a database and saving files on a computer has
                made the work relatively inefficient.{" "}
              </li>{" "}
              <li>
                Building the test file using node - fetch especially because of
                their complexity in the use of cookies.{" "}
              </li>{" "}
              <li> Website design(frontend) </li>{" "}
            </ol>{" "}
          </b>{" "}
          <li>
            Who is your partner ? name and id.What did you do ?What did your
            partner do ?
          </li>{" "}
          <b> Gal berger is mt partner, her id is: 206898199 </b>
          <b>
            I built the site base, product pages, home page, ordering and
            shipping process.Gal built the admin view, the sign - up and login
            process, and the functions that allow the admin to add products,
            delete products, and view user activities.{" "}
          </b>{" "}
          <li> Specify all the different routes your app supports </li>{" "}
          <b>
            <ol>
              <li> /login</li>
              <li> /logout</li>
              <li> /admin</li>
              <li> /admin</li>
              <li> /Payment</li>
              <li> /cart</li>
              <li> /placeorder</li>
              <li> /orderScreen</li>
              <li> /readme.html</li>
              <li> /wishlist/ : id ? </li> <li> /addReview / : id </li>{" "}
              <li> /product/: id </li> <li> /product /: id </li>{" "}
              <li> /admin/activity </li> <li> /admin / add </li>{" "}
              <li> /admin/delete </li>{" "}
            </ol>{" "}
          </b>{" "}
        </ol>{" "}
        <img src="/images/folks.png" alt="folks"></img>
      </div>{" "}
    </div>
  );
}
