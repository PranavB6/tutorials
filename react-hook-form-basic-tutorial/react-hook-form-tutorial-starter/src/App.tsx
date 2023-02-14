import "./App.css";

function App() {
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(`Submitted`);
  };

  return (
    <main className="main prose">
      <h1>Forms</h1>

      <form onSubmit={onSubmitHandler} className="form">
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input name="fullName" id="fullName" type="text" />
        </div>

        <div>
          <label htmlFor="food">Select Your Favourite Food!</label>
          <select name="food" id="food">
            <option value="" disabled>
              Please Select...
            </option>
            <option value="pizza">Pizza</option>
            <option value="burger">Burger</option>
            <option value="ice-cream">Ice Cream</option>
          </select>
        </div>

        <div>
          <input
            name="approvesTutorial"
            id="approves-tutorial"
            type="checkbox"
          />
          <label htmlFor="approves-tutorial">
            Do you approve this tutorial?
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default App;
