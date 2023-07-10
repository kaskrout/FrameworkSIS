const RessourceseComponent = () => {
  return (
    <div className="">
      <h1>Resource Management</h1>
      {/* <button>Import Resources</button> */}
      <input type="file" id="importButton" value="Import Resources" />
      <hr />
      <h2>Available Resources</h2>
      <ul id="resourceList"></ul>
    </div>
  );
};

export default RessourceseComponent;
