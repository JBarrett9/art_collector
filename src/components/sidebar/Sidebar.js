import "./sidebar.css";

const Sidebar = (props) => {
  const handleNext = () => {
    if (props.page < props.pages) {
      props.setPage(props.page + 1);
      props.fetchFromURL(props.nextPage, props.setItems);
    }
  };

  const handlePrev = () => {
    if (props.page > 1) {
      props.setPage(props.page - 1);
      props.fetchFromURL(props.prevPage, props.setItems);
    }
  };

  return (
    <div className="sidebar">
      <div className="buttons">
        {props.prevPage ? (
          <button onClick={handlePrev}>Previous</button>
        ) : (
          <button disabled>Previous</button>
        )}
        <span className="pages">
          {props.page} / {props.pages}
        </span>
        {props.nextPage ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button disabled>Next</button>
        )}
      </div>
      <div>
        {props.items ? (
          props.items.map((item) => (
            <div
              key={item.id}
              className="item-preview"
              onClick={() => props.setCurrItem(item)}
            >
              <a className="item-preview-title">{item.title}</a>
              <img src={item.primaryimageurl} style={{ width: "200px" }} />
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
