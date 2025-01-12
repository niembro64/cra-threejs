// /src/routes/Wudi2025W.jsx

import React from 'react';

const Wudi2025W = () => {
  // Here’s the data as a JS array of objects.
  // Each object has the player's name and their image URL (if any).
const players = [
  {
    name: 'Aidan Di Salvo',
    image: 'https://wudi.org/live3/media/profile_pictures/03bbce127c_IMG_3378.JPG',
  },
  {
    name: "Alex 'Alex' Solomon",
    image: 'https://wudi.org/live3/media/profile_pictures/b41bf094d4_Screen_Shot_2021-04-15_at_10.37.57_AM.png',
  },
  {
    name: 'Alex Bellows',
    image: 'https://wudi.org/live3/media/profile_pictures/52594db7b1_thumbnail.jpg',
  },
  {
    name: 'Alex Kosakowski',
    image: '',
  },
  {
    name: "Alexander 'Alex' Popov",
    image: 'https://wudi.org/live3/media/profile_pictures/df62bb6b88_Alex_Popov.jpg',
  },
  {
    name: "Alexander 'Sas' Peters",
    image: 'https://wudi.org/live3/media/profile_pictures/90911ac431_94E09C50-48F2-45A8-A2DE-F2D3F5CE60F8.jpeg',
  },
  {
    name: 'Allyse Fazio',
    image: 'https://wudi.org/live3/media/profile_pictures/fb630ef9f8_WUDI_Pic.JPG',
  },
  {
    name: "Andrew 'Andy' Bosco",
    image: '',
  },
  {
    name: "Andrew 'Cups' Purugganan",
    image: 'https://wudi.org/live3/media/profile_pictures/73599ca20c_1566493622679.jpg',
  },
  {
    name: "Andrew 'Seiden' Seiden",
    image: 'https://wudi.org/live3/media/profile_pictures/494e150539_16DF4A87-F81B-4821-9FCA-4DFE4CE6731C.jpeg',
  },
  {
    name: 'Andrew Kamensky',
    image: 'https://wudi.org/live3/media/profile_pictures/76fb710b77_Profile_0.jpg',
  },
  {
    name: 'Andrew Marshall',
    image: 'https://wudi.org/live3/media/profile_pictures/52865f29d7_OWeekHeadshot.jpg',
  },
  {
    name: "Anthony 'Tony' Havens",
    image: 'https://wudi.org/live3/media/profile_pictures/cb2dfc8cff_image0.jpeg',
  },
  {
    name: "Armen 'Armando' Kassabian",
    image: '',
  },
  {
    name: 'Austin Raymond',
    image: 'https://wudi.org/live3/media/profile_pictures/1114802d56_Screenshot_20220922-101044_LinkedIn.jpg',
  },
  {
    name: 'Barry Zhou',
    image: 'https://wudi.org/live3/media/profile_pictures/e1748b8a68_Photo_on_4-15-21_at_8.03_PM.jpg',
  },
  {
    name: "Benjamin 'Ben' Miller",
    image: 'https://wudi.org/live3/media/profile_pictures/3b375222a8_Screenshot_at_Aug_24_15-04-50.jpg',
  },
  {
    name: 'Bernadette Boyle',
    image: 'https://wudi.org/live3/media/profile_pictures/e00e42b32d_BBoyle.jpg',
  },
  {
    name: "Bob 'Bobo' Suvanich",
    image: 'https://wudi.org/live3/media/profile_pictures/12282107aa_IMG_2011.jpg',
  },
  {
    name: 'Brad Benjamin',
    image: 'https://wudi.org/live3/media/profile_pictures/eba3ae37db_usa_flatball.jpeg',
  },
  {
    name: 'Brendon Scheideler',
    image: 'https://wudi.org/live3/media/profile_pictures/5456c69b49_IMG_20210416_000947__01.jpg',
  },
  {
    name: "Brian 'Brock' Brockunier",
    image: 'https://wudi.org/live3/media/profile_pictures/f62a70307f_6A6AAF39-0AAF-4555-A00E-EEF6DB4ED9CC.jpeg',
  },
  {
    name: "Brody 'brodystaub' Staub",
    image: 'https://wudi.org/live3/media/profile_pictures/bad04e5c25_Screen_Shot_2021-05-11_at_2.04.09_PM.png',
  },
  {
    name: 'Bryan Gulyas',
    image: '',
  },
  {
    name: 'Caitlyn Hauswirth',
    image: 'https://wudi.org/live3/media/profile_pictures/6ecca9d42f_ELITE_120121_1219-LOWRES.jpg',
  },
  {
    name: "Cassandra 'Cass' Schaffa",
    image: 'https://wudi.org/live3/media/profile_pictures/165b3bf21e_FB_IMG_1617760133423.jpg',
  },
  {
    name: "Chris 'Monkey' O'Shea",
    image: 'https://wudi.org/live3/media/profile_pictures/161ba07d79_ochziff_coshea_LThumb.jpg',
  },
  {
    name: 'Chris Novielli',
    image: 'https://wudi.org/live3/media/profile_pictures/16ee45cc43_headshot_2.png',
  },
  {
    name: 'Chris Wells',
    image: 'https://wudi.org/live3/media/profile_pictures/52d42ca162_5.07.24_frisbeegrad-97.jpg',
  },
  {
    name: "Christian 'Riebs' Rieben",
    image: 'https://wudi.org/live3/media/profile_pictures/7d63afc5e2_IMG_6346.jpg',
  },
  {
    name: 'Christian Jungers',
    image: 'https://wudi.org/live3/media/profile_pictures/c0c66f1409_20210515_171540.jpg',
  },
  {
    name: "Christopher 'Chris' Cox",
    image: 'https://wudi.org/live3/media/profile_pictures/36287ba5ce_Resized_20200725_194338.jpeg',
  },
  {
    name: "Christopher 'Coach' Pagano",
    image: 'https://wudi.org/live3/media/profile_pictures/2518b7f584_CP_Headshot_1.jpg',
  },
  {
    name: "Christopher 'Dr. Freshman' Robles",
    image: 'https://wudi.org/live3/media/profile_pictures/95dc6506b8_robles_profile.jpg',
  },
  {
    name: 'Claire Dresselhuis',
    image: 'https://wudi.org/live3/media/profile_pictures/8344fff6c8_IMG_0712.jpeg',
  },
  {
    name: "Craig 'Scrappy' Lowell",
    image: 'https://wudi.org/live3/media/profile_pictures/226e528117_35329499_10100436995793881_2575215382264545280_n.jpg',
  },
  {
    name: "Daniel 'Dan' Chirlin",
    image: 'https://wudi.org/live3/media/profile_pictures/16b2a41d36_Capture.PNG',
  },
  {
    name: "Daniel 'Puma' Brubaker",
    image: 'https://wudi.org/live3/media/profile_pictures/337f1393f1_Screenshot_2021-04-17_at_10.06.22_PM.png',
  },
  {
    name: 'Daniel Gwartz',
    image: 'https://wudi.org/live3/media/profile_pictures/88cc41127c_5F6DAD3B-D576-4F47-BAE0-2C9D1152ACC2.jpeg',
  },
  {
    name: 'Daniel Hopemark',
    image: 'https://wudi.org/live3/media/profile_pictures/87382dec88_Danny_Hoppe-1004-L.jpg',
  },
  {
    name: 'Daniel Van Willigen',
    image: 'https://wudi.org/live3/media/profile_pictures/47409eec1e_Screenshot_2021-05-04_103620.jpg',
  },
  {
    name: 'Darrin Carducci',
    image: 'https://wudi.org/live3/media/profile_pictures/dc8e4eebb4_BA3471BC-011C-4D8A-8373-66751B1B7845.jpeg',
  },
  {
    name: "David 'Wex' Wexler",
    image: 'https://wudi.org/live3/media/profile_pictures/f913b19065_Dave_Profile_1.jpg',
  },
  {
    name: "Dee 'Dee' Palmer",
    image: 'https://wudi.org/live3/media/profile_pictures/5cb2042378_14525221_10101891612774875_3255060806338853922_o.jpg',
  },
  {
    name: "Denthew 'Den' Learey",
    image: 'https://wudi.org/live3/media/profile_pictures/57b1fc85db_frissbee_pic.jpg',
  },
  {
    name: 'Diana DeLeo',
    image: 'https://wudi.org/live3/media/profile_pictures/3dfc07f263_IMG_1319.jpeg',
  },
  {
    name: 'Doug Bretherton',
    image: 'https://wudi.org/live3/media/profile_pictures/97bfcc4adb_IMG_A42E429E4F25-1.jpeg',
  },
  {
    name: 'Doug Choe',
    image: '',
  },
  {
    name: 'Drew Woods',
    image: 'https://wudi.org/live3/media/profile_pictures/6488710afe_IMG_20201201_192856_920.jpg',
  },
  {
    name: 'Dylan LaGamma',
    image: 'https://wudi.org/live3/media/profile_pictures/8f4454eb76_unnamed.jpg',
  },
  {
    name: 'Elissa Picozzi',
    image: 'https://wudi.org/live3/media/profile_pictures/29c692ae32_IMG_9009.jpeg',
  },
  {
    name: "Elizabeth 'Liz' Guerrera",
    image: 'https://wudi.org/live3/media/profile_pictures/e7de69af7b_A11F28A4-A17C-483F-856F-FDA89F501F3B.jpeg',
  },
  {
    name: "Elizabeth 'Shaka' Borecki",
    image: 'https://wudi.org/live3/media/profile_pictures/91ac43e938_liz.jpg',
  },
  {
    name: "Eric 'Niemo' Niemeyer",
    image: 'https://wudi.org/live3/media/profile_pictures/76190a8459_69750695_10103209939906868_712121632264552448_n.jpg',
  },
  {
    name: 'Faith Summers',
    image: 'https://wudi.org/live3/media/profile_pictures/46689e6879_DSC_0146.jpg',
  },
  {
    name: "Freddy 'Fweddy' Perlman",
    image: 'https://wudi.org/live3/media/profile_pictures/027b6bba79_Screenshot_20180528-113802.png',
  },
  {
    name: 'Gav Baron',
    image: 'https://wudi.org/live3/media/profile_pictures/a0194e8624_1000028324.jpg',
  },
  {
    name: "Gwendolin 'Gwen ' Learey",
    image: 'https://wudi.org/live3/media/profile_pictures/2f360e8216_IMG_1760.jpeg',
  },
  {
    name: 'Hannah Isaacson',
    image: 'https://wudi.org/live3/media/profile_pictures/17bf12a887_6DE2088D-83EA-42A5-BA12-CC56521C8A46.jpeg',
  },
  {
    name: 'Isaac Cohen',
    image: 'https://wudi.org/live3/media/profile_pictures/f3bea20d73_IMG_1395-EDIT.jpg',
  },
  {
    name: "Ivan 'Ivan' Mironchuk",
    image: 'https://wudi.org/live3/media/profile_pictures/3d9460acdd_Ivan-sf.jpg',
  },
  {
    name: "Jacob 'Roofus' Margolis",
    image: 'https://wudi.org/live3/media/profile_pictures/d85bc4605d_wudiprofile_copy.png',
  },
  {
    name: 'Jake Kaufman',
    image: 'https://wudi.org/live3/media/profile_pictures/511b2a7e4a_Capture.JPG',
  },
  {
    name: 'Jake Ryder',
    image: 'https://wudi.org/live3/media/profile_pictures/3636382c3d_Profile_Picture.jpeg',
  },
  {
    name: "James 'Breez' Martorano",
    image: 'https://wudi.org/live3/media/profile_pictures/8131a34a63_Fools_Fest_Sunday_Sandy_Canetti.jpg',
  },
  {
    name: "James 'JB' Beck",
    image: 'https://wudi.org/live3/media/profile_pictures/75767a4f3c_J_Beck_Headshot.jpg',
  },
  {
    name: 'James Lee',
    image: 'https://wudi.org/live3/media/profile_pictures/3d213e2f3c_photo_james.jpeg',
  },
  {
    name: 'Jason Kahn',
    image: 'https://wudi.org/live3/media/profile_pictures/dd7469b1b1_wudi_pic.jpg',
  },
  {
    name: 'Jeffrey Knopf',
    image: '',
  },
  {
    name: 'Joan Foley',
    image: 'https://wudi.org/live3/media/profile_pictures/7f26daa3c6_IMG_8501.jpg',
  },
  {
    name: "John 'Shockey' Palmer",
    image: 'https://wudi.org/live3/media/profile_pictures/7b6d865ca7_5fee3c63-4816-4e2c-b5e5-a9f1df01a180.JPG',
  },
  {
    name: 'Jon Hirschberger',
    image: 'https://wudi.org/live3/media/profile_pictures/122b686fe7_T03PJHQPTK9-U05612G7VNV-3b566b918561-512.jpg',
  },
  {
    name: "Jonathan 'Ramos' Ramos",
    image: 'https://wudi.org/live3/media/profile_pictures/548f1af40b_IMG_7110_1.jpg',
  },
  {
    name: 'Jordan Acker',
    image: 'https://wudi.org/live3/media/profile_pictures/dc4c978d31_IMG_6723_2.PNG',
  },
  {
    name: 'Jordan Chow',
    image: 'https://wudi.org/live3/media/profile_pictures/9531bf0377_49739306_2197106390340676_5560879146667606016_n.jpg',
  },
  {
    name: "Joseph 'CJ' Ouellette",
    image: 'https://wudi.org/live3/media/profile_pictures/d5273b76fa_Bid_Against_Wodatch.jpg',
  },
  {
    name: "Josh 'Josh' Bae",
    image: 'https://wudi.org/live3/media/profile_pictures/d756eb930e_IMG_6521.jpeg',
  },
  {
    name: "Joshua 'Coldwater' Cadwallader",
    image: 'https://wudi.org/live3/media/profile_pictures/56511ef82a__DSC9908.jpg',
  },
  {
    name: "Joshua 'Slater' Levey",
    image: 'https://wudi.org/live3/media/profile_pictures/ebf583d5d6_Slater_ultimate_frisbee_headshot.jpg',
  },
  {
    name: "Justin O'Kelly",
    image: 'https://wudi.org/live3/media/profile_pictures/1a5c3f6422_IMG_2238.JPG',
  },
  {
    name: 'Karen Chalif',
    image: 'https://wudi.org/live3/media/profile_pictures/7c29061efa_Screen_Shot_2021-08-15_at_10.56.35_AM.png',
  },
  {
    name: 'Karissa Tabtieng',
    image: 'https://wudi.org/live3/media/profile_pictures/89b1924c54_299200125_1182642422670510_4325698178667103822_n.jpg',
  },
  {
    name: 'Katie Hu',
    image: 'https://wudi.org/live3/media/profile_pictures/f65614b3ac_KH.jpg',
  },
  {
    name: 'Kayla Koffler',
    image: 'https://wudi.org/live3/media/profile_pictures/ed74a779d1_unnamed.jpg',
  },
  {
    name: "Kevin 'Bird' McCarthy",
    image: 'https://wudi.org/live3/media/profile_pictures/7379f3b975_kmccarthy.jpg',
  },
  {
    name: 'Kevin Fox',
    image: 'https://wudi.org/live3/media/profile_pictures/843199d1a1_IMG_0953.JPG',
  },
  {
    name: "Kshitij 'K' Fadnis",
    image: 'https://wudi.org/live3/media/profile_pictures/78437a2ebb_p3.jpeg',
  },
  {
    name: 'Kyle Friedrichs',
    image: 'https://wudi.org/live3/media/profile_pictures/3db6423c8b_32367272_10100366764957355_3369834707695960064_o.jpg',
  },
  {
    name: "Lauren 'LD' Doyle",
    image: 'https://wudi.org/live3/media/profile_pictures/cea2db8ec8_IMG_0189.JPG',
  },
  {
    name: 'Lisa Silberkleit',
    image: 'https://wudi.org/live3/media/profile_pictures/c8f1ddae89_WUDI.jpg',
  },
  {
    name: 'Louis Marino',
    image: 'https://wudi.org/live3/media/profile_pictures/d76471cc57_06AEE1D8-2F3D-477B-B734-5F94CC069D92.jpeg',
  },
  {
    name: 'Maria Alguacil',
    image: '',
  },
  {
    name: 'Maryann Platt',
    image: 'https://wudi.org/live3/media/profile_pictures/a210b3e44f_headshot.jpeg',
  },
  {
    name: "Matthew 'Cat' Stevens",
    image: 'https://wudi.org/live3/media/profile_pictures/52b805ba0e_mstevens_profile.jpg',
  },
  {
    name: "Matthew 'Gomez' Baum",
    image: 'https://wudi.org/live3/media/profile_pictures/d10a369c6a_020D46F0-CD6D-4B35-83FA-4F9E2AF52ACA.jpeg',
  },
  {
    name: "Matthew 'Matt' Leventhal",
    image: 'https://wudi.org/live3/media/profile_pictures/f8183d893d_1011489_10151507666822657_1124213244_n.jpg',
  },
  {
    name: "Maureen 'Mo' Dougherty",
    image: 'https://wudi.org/live3/media/profile_pictures/b763d497dc_Pic.png',
  },
  {
    name: 'Max Lieberman',
    image: '',
  },
  {
    name: 'Meta Learey',
    image: 'https://wudi.org/live3/media/profile_pictures/fd00c8a622_29675E25-54FC-4C04-B7C2-487D64C2EC4C.JPG',
  },
  {
    name: 'Michael Ciancimino',
    image: 'https://wudi.org/live3/media/profile_pictures/0ffbf438a7_Notre_Dame_Trip.jpg',
  },
  {
    name: 'Michael Goldmann',
    image: 'https://wudi.org/live3/media/profile_pictures/837f793d0c_IMG_20210418_104346636.jpg',
  },
  {
    name: "Michael O'Brien",
    image: 'https://wudi.org/live3/media/profile_pictures/f20d0af2d9_22047693_10214082670042204_4480383363565173225_o.jpg',
  },
  {
    name: 'Michael Stein',
    image: 'https://wudi.org/live3/media/profile_pictures/c83864b088_IMG_0515_2_Sized.jpg',
  },
  {
    name: "Mike 'Gronk' Lovisa",
    image: 'https://wudi.org/live3/media/profile_pictures/5314d7ba16_Mike_to_School.JPG',
  },
  {
    name: "Mike 'Samson' Samuelson",
    image: 'https://wudi.org/live3/media/profile_pictures/f101b8bcc8_wudi_profile_pic.JPG',
  },
  {
    name: 'Miranda Moore',
    image: 'https://wudi.org/live3/media/profile_pictures/71f17b868e_Resized_20200728_183418.jpeg',
  },
  {
    name: 'Owen Robinson',
    image: 'https://wudi.org/live3/media/profile_pictures/564b9ed65c_IMG_2132.jpg',
  },
  {
    name: "Patrick 'Whizzer' McMenamin",
    image: 'https://wudi.org/live3/media/profile_pictures/f14662ee12_Great_Scott.jpeg',
  },
  {
    name: "Paul 'Memphis' Recht",
    image: 'https://wudi.org/live3/media/profile_pictures/80f3169c2c_Paul_Wudi.jpg',
  },
  {
    name: 'Peter Tu',
    image: '',
  },
  {
    name: "Philip 'Phil' Guerci",
    image: 'https://wudi.org/live3/media/profile_pictures/7978a4fabb_PJG.jpg',
  },
  {
    name: 'Robert Hsu',
    image: 'https://wudi.org/live3/media/profile_pictures/26176d4848_20231023_170059.jpg',
  },
  {
    name: 'Ryan Moore',
    image: 'https://wudi.org/live3/media/profile_pictures/c9140e3f82_Moore_Ryan_D_bw.jpg',
  },
  {
    name: 'Ryan Nassisi',
    image: 'https://wudi.org/live3/media/profile_pictures/0f66260326_CoEd19.JPG',
  },
  {
    name: 'Sach Arora',
    image: 'https://wudi.org/live3/media/profile_pictures/a4578d2bae_CF27CC19-063E-4B06-B2E8-7E1052C22A99.jpeg',
  },
  {
    name: 'Sal Pepe',
    image: 'https://wudi.org/live3/media/profile_pictures/fe4778e59e_IMG_3374.jpg',
  },
  {
    name: "Sebastian 'Seb' Neufuss",
    image: 'https://wudi.org/live3/media/profile_pictures/406768e9ca_E7898654-9945-40B1-8937-0D050798B4A1.jpeg',
  },
  {
    name: 'Seth Tannenbaum',
    image: 'https://wudi.org/live3/media/profile_pictures/ce61f7a5ad_315389535_M3q7Y-O.jpg',
  },
  {
    name: 'Sophie Stahl',
    image: 'https://wudi.org/live3/media/profile_pictures/ff971db0de_IMG_1174.jpeg',
  },
  {
    name: 'Stephanie Mellin',
    image: 'https://wudi.org/live3/media/profile_pictures/58bdbcd8b8_AFB38244-F7E1-4CD5-977C-15F0299DC1F5.jpeg',
  },
  {
    name: 'Stephen McDonald',
    image: 'https://wudi.org/live3/media/profile_pictures/b809283d8a_Screen_Shot_2023-09-05_at_8.36.21_PM.png',
  },
  {
    name: 'Summer Zheng',
    image: '',
  },
  {
    name: 'Tal Niv',
    image: 'https://wudi.org/live3/media/profile_pictures/b0286ed0db_i-rqwdDsx-X5.jpg',
  },
  {
    name: 'Taylor Shelton',
    image: 'https://wudi.org/live3/media/profile_pictures/e046fc347a_IMG_20220729_154343_808.jpg',
  },
  {
    name: 'Toby Falk',
    image: 'https://wudi.org/live3/media/profile_pictures/54ed53f587_IMG_5952.jpg',
  },
  {
    name: 'Victor Gondar',
    image: 'https://wudi.org/live3/media/profile_pictures/267ce7eae4_epic_pass_photo.jpg',
  },
  {
    name: 'Victoria Leontios',
    image: 'https://wudi.org/live3/media/profile_pictures/f6c4908846_IMG_1037_copy.jpg',
  },
  {
    name: 'Will Roble',
    image: 'https://wudi.org/live3/media/profile_pictures/168d475ea0_IMG_3452.jpg',
  },
  {
    name: "Zachary 'Obie' Oberholtzer",
    image: 'https://wudi.org/live3/media/profile_pictures/8738cc9fcf_image0.jpeg',
  },
  {
    name: "Zachary Tecun",
    image: 'https://wudi.org/live3/media/profile_pictures/c8de51a9e9_120288969_10158032380449132_275494478457774236_n.jpg',
  },
  {
    name: 'Zing Gee',
    image: 'https://wudi.org/live3/media/profile_pictures/bc5f4a2088_Gees.JPEG',
  },
];


  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-6 text-4xl font-bold">WUDI 2025 Winter League</h1>

        {players.map((player, idx) => (
          <div
            key={idx}
            className="mb-4 flex items-center border-b border-gray-700 pb-2"
          >
            {player.image ? (
              <img
                src={player.image}
                alt={player.name}
                className="mr-4 h-20 w-auto object-cover"
              />
            ) : (
              <div className="mr-4 flex h-20 w-20 items-center justify-center bg-gray-800">
                <span className="text-xs text-gray-500">No Image</span>
              </div>
            )}
            <span className="text-lg font-semibold">{player.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wudi2025W;
