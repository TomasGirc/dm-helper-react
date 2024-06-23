import "../assets/styles/book.scss";

export default function TestPage() {
  return (
    <div className="bookCover">
      <input type="checkbox" id="checkbox-cover"></input>
      <input type="checkbox" id="checkbox-page1"></input>
      <input type="checkbox" id="checkbox-page2"></input>
      <div className="book">
        <div className="cover">
          <label htmlFor="checkbox-cover"></label>
        </div>
        <div className="page" id="page1">
          <div className="front-page">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
              magni laudantium beatae quia. Recusandae, fuga quas consectetur
              perferendis aperiam esse velit veniam ducimus? Quisquam
              consequatur perferendis quidem quia, recusandae ab!
            </p>
            <label className="next" htmlFor="checkbox-page1">
              <p className="fas fa-chevron-right">Next</p>
            </label>
          </div>
          <div className="back-page">
            <img src="https://img.freepik.com/free-photo/conference-room-with-desk-wall-windows-that-says-office_1340-37385.jpg"></img>
            <label className="prev" htmlFor="checkbox-page1">
              <p className="fas fa-chevron-right">Previous</p>
            </label>
          </div>
        </div>
        <div className="page" id="page2">
          <div className="front-page">
            <h2>Page 2</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
              magni laudantium beatae quia. Recusandae, fuga quas consectetur
              perferendis aperiam esse velit veniam ducimus? Quisquam
              consequatur perferendis quidem quia, recusandae ab!
            </p>
            <label className="next" htmlFor="checkbox-page2">
              <p className="fas fa-chevron-right">Next</p>
            </label>
          </div>
          <div className="back-page">
            <img src="https://t4.ftcdn.net/jpg/03/84/55/29/360_F_384552930_zPoe9zgmCF7qgt8fqSedcyJ6C6Ye3dFs.jpg"></img>
            <label className="prev" htmlFor="checkbox-page2">
              <p className="fas fa-chevron-right">Previous</p>
            </label>
          </div>
        </div>
        <div className="page" id="page3">
          <div className="front-page">
            <h2>Page 3</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
              magni laudantium beatae quia. Recusandae, fuga quas consectetur
              perferendis aperiam esse velit veniam ducimus? Quisquam
              consequatur perferendis quidem quia, recusandae ab!
            </p>
          </div>
        </div>
        <div className="back-cover"></div>
      </div>
    </div>
  );
}
