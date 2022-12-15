import "./Form.css";

const Form = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.setPage(1);
    props.generateList();
  };
  console.log(props.mediums);
  return (
    <form className="form" onSubmit={handleSubmit}>
      <span className="form-group">
        <label>Query</label>
        <input
          placeholder="enter keywords..."
          value={props.keywords}
          onChange={(e) => props.setKeywords(e.target.value)}
        />
      </span>
      <span className="form-group">
        <label>
          Classification{" "}
          <span className="num-items">({props.classifications.length})</span>
        </label>
        <select
          value={props.classification}
          onChange={(e) => props.setClassification(e.target.value)}
        >
          <option value="">Any</option>
          {props.classifications.map((classification) => (
            <option key={classification.id} value={classification.name}>
              {classification.name}
            </option>
          ))}
        </select>
      </span>
      <span className="form-group">
        <label>
          Century <span className="num-items">({props.centuries.length})</span>
        </label>
        <select
          value={props.century}
          onChange={(e) => props.setCentury(e.target.value)}
        >
          <option value="">Any</option>
          {props.centuries.map((century) => (
            <option key={century.id} value={century.name}>
              {century.name}
            </option>
          ))}
        </select>
      </span>
      <span className="form-group">
        <label>
          Medium{" "}
          <span className="num-items">
            ({Object.keys(props.mediums).length})
          </span>
        </label>
        <select
          value={props.medium}
          onChange={(e) => props.setMedium(e.target.value)}
        >
          <option value="">Any</option>
          {Object.keys(props.mediums).map((key) => (
            <option key={props.mediums[key]} value={props.mediums[key]}>
              {key}
            </option>
          ))}
        </select>
      </span>
      <button>Search</button>
    </form>
  );
};

export default Form;
