import React from 'react'
import { Link } from 'wouter'
import MenuCard from '../components/MenuCard'

const menuItems = [
  {
    text: 'Өндөрт, шат тавцан дээр ажиллах',
    imgSrc: '/images/menu/1.png',
    link: '/1',
  },
  {
    text: 'Цахилгааны таслах, залгах аппаритурын аюул',
    imgSrc: '/images/menu/2.png',
    link: '/2',
  },
  {
    text: 'Үйлдвэрийн байранд тохиолдож болох шат тавцангаас хальтрах, уур усанд түлэгдэх аюул',
    imgSrc: '/images/menu/3.png',
    link: '/3',
  },
  {
    text: 'Онцгой нөхцөл байдал, осол аваарь гарсан үед гарц, тэмдэг тэмдэглэгээний дагуу явж аюулгүй газарт очих',
    imgSrc: '/images/menu/4.png',
    link: '/3',
  },
  {
    text: 'Гар болон слесарийн багажны аюул',
    imgSrc: '/images/menu/5.png',
    link: '/3',
  },
  {
    text: 'Нэг бүрийн хувийн хамгаалах хэрэгсэл өмсөөгүйгээс үүдэх аюул',
    imgSrc: '/images/menu/6.png',
    link: '/3',
  },
]

const Menu = () => {
  return (
    <div className="menu-w">
      <div className="cards-w">
        {menuItems.map((item, index) => (
          <MenuCard
            text={item.text}
            imgSrc={item.imgSrc}
            key={index}
            link={item.link}
          />
        ))}
      </div>
      <div className="buttons-w">
        <Link href="/">
          <button className="btn">Буцах</button>
        </Link>
        <Link href="/">
          <button className="btn">Гарах</button>
        </Link>
      </div>
    </div>
  )
}

export default Menu
