import CourseItem from "./CourseItem";
import { useState, useEffect } from "react";
export default function CourseFilter() {
  let divStyle = {
    cursor: "pointer",
  };

  const [course, setCourses] = useState([]);
  const [searched, setsearched] = useState([false]);
  const [totalcourses, settotal] = useState(null);
  const [page, setpage] = useState(1);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/api/courses${category}`)
      .then((response) => response.json())
      .then((data) => {
        if (totalcourses === null) {
          settotal(data.length);
        }
        setCourses(data);
        setsearched([false]);
      });
  }, [category]);

  function handle_page_change(event) {
    setpage(event.currentTarget.id);
  }

  function handleClick(event) {
    setCategory(`/category/${event.currentTarget.id}`);
  }

  function handleSearch(event) {
    let arr = [];
    let lowerCase = event.target.value.toLowerCase();
    if (lowerCase === "") {
      setsearched([false]);
    }
    course.find((obj, i) => {
      if (obj.title.includes(lowerCase)) {
        arr.push(obj);
      }
    });
    setsearched(arr);
  }
  function PaginationElement(props) {
    return (
      <li>
        <a
          id={props.id}
          className={props.id.toString() === page ? "active" : ""}
          style={divStyle}
          onClick={handle_page_change}
        >
          {props.id}
        </a>
      </li>
    );
  }

  return (
    <div className="blog-area pd-top-120 pd-bottom-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 order-lg-12">
            <div className="row">
              <CourseItem
                item={
                  searched[0] === false
                    ? course.slice((page - 1) * 4, (page - 1) * 4 + 4)
                    : searched.slice((page - 1) * 4, (page - 1) * 4 + 4)
                }
                page="filter"
              />
            </div>
            <nav className="td-page-navigation">
              <ul className="pagination">
                {/* <li className="pagination-arrow"><a href="#"><i className="fa fa-angle-double-left"></i></a></li> */}

                {[...Array(Math.floor(totalcourses / 4) + 1)].map(
                  (value, index) => (
                    <PaginationElement id={index + 1} key={index} />
                  )
                )}
                {/* <li className="pagination-arrow"><a href="#"><i className="fa fa-angle-double-right"></i></a></li> */}
              </ul>
            </nav>
          </div>
          <div className="col-lg-4 order-lg-1 col-12">
            <div className="td-sidebar mt-5 mt-lg-0">
              <div className="widget widget_search_course">
                <h4 className="widget-title">Search</h4>
                <form className="search-form single-input-inner">
                  <input
                    type="text"
                    placeholder="Search here"
                    onChange={handleSearch}
                  />
                  {/* <button className="btn btn-base w-100 mt-3"><i className="fa fa-search"></i>
                                        SEARCH</button> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
