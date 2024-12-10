import React from 'react';

function CategoriesList({ login, categories, onSelectCategory }) {
    return (
        <div className="categories-list">
            <h3>Categories</h3>
            {Object.entries(categories).map(([id, category]) => (
                <div key={id} onClick={() => onSelectCategory(id)}>
                    {category.name}
                </div>
            ))}
        </div>
    );
}

export default CategoriesList;
