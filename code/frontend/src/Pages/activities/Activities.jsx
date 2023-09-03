export default function Activities() {
  return (
    <div className="createactivities">
      <h3>Activitiy Creator</h3>
      <form>
        {" "}
        <label>
          <span>Your Activity</span>
          <input type="text" name="name" required />
        </label>
        <label>
          <span>Your message for those that are joining:</span>
          <textarea name="message" required></textarea>
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}
