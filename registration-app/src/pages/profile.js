import Main from "../layouts/main";
import { Link } from "react-router-dom";

function Profile(props) {
  return (
    <Main>
      <div className="profile">
        <div className="profile-picture">
          <img src="/img/testimonial-1.jpg" alt="Profile Picture" />
          <p>ชื่อ-สกุล</p>
          <p>อายุ: XX ปี</p>
          <p>ที่อยู่: ที่อยู่ปัจจุบัน</p>
          <p>อีเมล: example@example.com</p>
          <p>โทร: 012-345-6789</p>
        </div>
        <div className="profile-details">
          <p>เคยอบรม:</p>
          <ul>
            <li>หลักสูตรที่ 1</li>
            <li>หลักสูตรที่ 2</li>
            <li>หลักสูตรที่ 3</li>
          </ul>
        </div>
      </div>
    </Main>
  );
}

export default Profile;
