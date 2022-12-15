import "./content.css";

const Content = (props) => {
  if (!props.currItem.title) return <></>;
  let currItem = props.currItem;
  return (
    <div className="content">
      <header className="content-head">
        <h2>{currItem.title}</h2>
        <p>{currItem.dated}</p>
      </header>
      <div className="details">
        {currItem.culture ? (
          <span>
            <h3>Culture</h3>
            <a
              className="searchable"
              onClick={() =>
                props.fetchFromParam(
                  "culture",
                  currItem.culture,
                  props.setItems
                )
              }
            >
              {currItem.culture}
            </a>
          </span>
        ) : (
          <></>
        )}
        {currItem.technique ? (
          <span>
            <h3>Technique</h3>
            <a
              className="searchable"
              onClick={() =>
                props.fetchFromParam(
                  "technique",
                  currItem.techniqueid,
                  props.setItems
                )
              }
            >
              {currItem.technique}
            </a>
          </span>
        ) : (
          <></>
        )}{" "}
        {currItem.medium ? (
          <span>
            <h3>Medium</h3>
            <a
              className="searchable"
              onClick={() =>
                props.fetchFromParam(
                  "medium",
                  props.mediums[currItem.medium.toLowerCase()],
                  props.setItems
                )
              }
            >
              {currItem.medium}
            </a>
          </span>
        ) : (
          <></>
        )}
        {currItem.dimensions ? (
          <span>
            <h3>Dimensions</h3>
            <p>{currItem.dimensions}</p>
          </span>
        ) : (
          <></>
        )}
        {currItem.people ? (
          <span>
            <h3>Person/s</h3>
            <p>
              {currItem.people.map((person) => (
                <a
                  className="searchable"
                  key={person.personid}
                  onClick={() =>
                    props.fetchFromParam(
                      "person",
                      person.personid,
                      props.setItems
                    )
                  }
                >
                  {person.name}
                  {"  "}
                </a>
              ))}
            </p>
          </span>
        ) : (
          ""
        )}
        {currItem.department ? (
          <span>
            <h3>Department</h3>
            <p>{currItem.department}</p>
          </span>
        ) : (
          <></>
        )}
        {currItem.division ? (
          <span>
            <h3>Division</h3>
            <p>{currItem.division}</p>
          </span>
        ) : (
          <></>
        )}
        {currItem.contact ? (
          <span>
            <h3>Contact</h3>
            <a className="searchable" href={`mailto:${currItem.contact}`}>
              {currItem.contact}
            </a>
          </span>
        ) : (
          <></>
        )}
        {currItem.creditline ? (
          <span>
            <h3>Credit</h3>
            <p>{currItem.creditline}</p>
          </span>
        ) : (
          <></>
        )}
      </div>
      <div className="images">
        {currItem.images.map((img) => (
          <img
            className="item-img"
            key={img.imageid}
            src={img.baseimageurl}
            alt={img.alttext}
          />
        ))}
      </div>
    </div>
  );
};

export default Content;
