import React from 'react'
import { Link } from 'wouter'

const MenuCard = ({ text, imgSrc, link }) => {
  return (
    <Link href={link}>
      <div className="card-w">
        <div className="text-w">
          <p>{text}</p>
        </div>
        <div className="img-w">
          <img src={imgSrc} alt="" />
        </div>
      </div>
    </Link>
  )
}

export default MenuCard
