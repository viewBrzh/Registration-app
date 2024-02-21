import Main from "../layouts/main";
import { Link } from "react-router-dom";

function Profile(props) {
  return (
    <Main>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', }}>
        <div className="profile" style={{ marginTop: '100px', backgroundColor: '#E695B5', margin: '0 auto', maxWidth: '900px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', }}>
          <div className="profile" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', maxWidth: '900px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', }}>
            <div className="profile-picture" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              <img src="/img/testimonial-1.jpg" alt="Profile Picture" style={{ maxWidth: '200px', borderRadius: '50%', border: '5px solid #E695B5' }} />
            </div>
            <div className="profile-details" style={{ textAlign: 'center' }}>
              <h2 style={{ margin: '0' }}>ชื่อ-สกุล</h2>
              <p style={{ margin: '5px 0' }}>อายุ: XX ปี</p>
              <p style={{ margin: '5px 0' }}>ที่อยู่: ที่อยู่ปัจจุบัน</p>
              <p style={{ margin: '5px 0' }}>อีเมล: example@example.com</p>
              <p style={{ margin: '5px 0' }}>โทร: 012-345-6789</p>
            </div>
          </div>
        </div>


        <div className="profile" style={{ marginTop: '100px', backgroundColor: '#E695B5', margin: '0 auto', maxWidth: '500px', display: 'grid', gridTemplateColumns: '1fr', gap: '20px', }}>
          <div className="profile" style={{ display: 'flex', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', }}>
            <div style={{ flex: '1', marginRight: '20px' }}>
              <img src="/img/testimonial-1.jpg" alt="Profile Picture" style={{ width: '100%', maxWidth: '200px', height: 'auto', borderRadius: '10px' }} />
            </div>
            <div className="profile-details" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ margin: '0' }}>เคยอบรม:</p>
              <ul style={{ paddingLeft: '20px', margin: '5px 0' }}>
                <li>หลักสูตรที่ 1</li>
                <li>หลักสูตรที่ 2</li>
                <li>หลักสูตรที่ 3</li>
              </ul>
            </div>
          </div>
          <div className="profile" style={{ display: 'flex', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', }}>
            <div style={{ flex: '1', marginRight: '20px' }}>
              <img src="/img/testimonial-1.jpg" alt="Profile Picture" style={{ width: '100%', maxWidth: '200px', height: 'auto', borderRadius: '10px' }} />
            </div>
            <div className="profile-details" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ margin: '0' }}>เคยอบรม:</p>
              <ul style={{ paddingLeft: '20px', margin: '5px 0' }}>
                <li>หลักสูตรที่ 1</li>
                <li>หลักสูตรที่ 2</li>
                <li>หลักสูตรที่ 3</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default Profile;
