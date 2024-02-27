import "./widgetLg.css";

export default function WidgetLg({ newVideos }) {

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Videos</h3>
      <table className="widgetLgTable shadow-none" style={{borderCollapse: 'inherit'}}>
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Video</th>
            <th className="widgetLgTh">Category</th>
            <th className="widgetLgTh">Year</th>
            <th className="widgetLgTh">Duration</th>
          </tr>
          {
            newVideos.map((video) => (
              <tr className="widgetLgTr">
                <td className="widgetLgUser">
                  <img
                    src={
                      "https://cdn.pixabay.com/photo/2013/07/12/16/56/play-151523_1280.png"
                    }
                    alt=""
                    className="widgetLgImg"
                  />
                  <span className="widgetLgName">{video.title}</span>
                </td>
                <td className="widgetLgDate">{video.category}</td>
                <td className="widgetLgAmount">{video.year}</td>
                <td className="widgetLgDate">{video.duration}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
