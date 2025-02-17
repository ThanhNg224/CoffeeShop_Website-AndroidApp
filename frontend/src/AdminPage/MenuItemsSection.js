import React from 'react';

const MenuItemsSection = ({
  menuItems,
  currentPage,
  categories,
  handleDetailsClick,
  handleDeleteItem,
  handleNextPage,
  handlePrevPage
}) => (
  <section>
    <h2>Menu Items</h2>
    {Object.keys(categories).map(category => (
      <div key={category} className="menu-category">
        <h2>{category}</h2>
        <div className="item-container">
          {menuItems
            .filter(item => item.category === category)
            .slice(currentPage[category] * 3, (currentPage[category] + 1) * 3)
            .map(item => (
              <div key={item.id} className="item">
                <img src={item.img} alt={item.name} />
                <p>{item.name}</p>
                <button className="detail-button" onClick={() => handleDetailsClick(item)}>Details</button>
                <button className="delete-button" onClick={() => handleDeleteItem(item.id)}>Delete</button>
              </div>
            ))}
        </div>
        {currentPage[category] > 0 &&
          <button className="popup-button detail-button prev" onClick={() => handlePrevPage(category)}>{"<"}</button>
        }
        {currentPage[category] < Math.ceil(categories[category] / 3) - 1 &&
          <button className="popup-button detail-button next" onClick={() => handleNextPage(category)}>{">"}</button>
        }
      </div>
    ))}
  </section>
);

export default MenuItemsSection;
