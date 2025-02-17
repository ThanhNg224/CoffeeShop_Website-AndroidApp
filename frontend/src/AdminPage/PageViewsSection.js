import React from 'react';

const PageViewsSection = ({ pageViews }) => (
  <section>
    <h2>Page Views</h2>
    <table className="page-views-table">
      <thead>
        <tr>
          <th>Page</th>
          <th>Views</th>
        </tr>
      </thead>
      <tbody>
        {pageViews.map(view => (
          <tr key={view.path}>
            <td>{view.path}</td>
            <td>{view.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

export default PageViewsSection;
