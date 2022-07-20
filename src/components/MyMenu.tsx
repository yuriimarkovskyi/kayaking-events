import { Menu, MenuProps } from 'antd';
import { db } from 'config/firebase';
import { ref } from 'firebase/database';
import React from 'react';
import { useListVals } from 'react-firebase-hooks/database';
import { NavLink } from 'react-router-dom';
import { ICategory, IEvent } from 'types';

function MyMenu() {
  const [categories] = useListVals<ICategory>(ref(db, 'categories'));
  const [events] = useListVals<IEvent>(ref(db, 'events'));

  const filteredCategories = categories?.filter((category) => (
    events?.some((event) => (
      category.categoryName === event.categoryName
      && category.isPublished
      && event.isPublished
    ))
  ));

  const links: MenuProps['items'] = [
    {
      label: (
        <NavLink to="/categories">
          Категорії
        </NavLink>
      ),
      key: 'categories',
      children: filteredCategories?.map((category) => (
        {
          label: (
            <NavLink to={`/categories/${category.link}`}>
              {category.categoryName}
            </NavLink>
          ),
          key: category.link,
        }
      )),
    },
    {
      label: 'Події',
      key: 'events',
      children: filteredCategories?.map((category) => (
        {
          type: 'group',
          label: category.categoryName,
          children: events
            ?.filter((event) => event.isPublished && event.categoryName === category.categoryName)
            .map((filteredEvent) => (
              {
                label: (
                  <NavLink to={`/event/${filteredEvent.link}`}>
                    {filteredEvent.eventName}
                  </NavLink>
                ),
                key: filteredEvent.link,
              }
            )),
        }
      )),
    },
  ];

  return (
    <Menu
      className="menu"
      mode="horizontal"
      theme="dark"
      items={links}
    />
  );
}

export default MyMenu;
