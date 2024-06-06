import React, { Suspense } from 'react';
import { loadRemote, registerRemotes } from '@modern-js/runtime/mf';

registerRemotes([
  {
    name: 'dynamic_nested_remote',
    entry: 'http://localhost:3009/mf-manifest.json',
  },
  {
    name: 'dynamic_remote',
    entry: 'http://localhost:3008/mf-manifest.json',
  },
]);

const DynamicNestedRemote = React.lazy(() =>
  loadRemote('dynamic_nested_remote/Content').then((m) => {
    return m;
  }),
);

const DynamicRemote = React.lazy(() =>
  loadRemote('dynamic_remote/Image').then((m) => {
    return m;
  }),
);

const Remote = React.lazy(() => {
  return import('remote/Image').then((r) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(r);
      }, 2000);
    });
  });
});

const NestedRemote = React.lazy(() => {
  return import('nested_remote/Content').then((r) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(r);
      }, 1000);
    });
  });
});

const Index = (): JSX.Element => {
  return (
    <div>
      <h1>Dynamic Nested Remote</h1>
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <td></td>
            <td>Desc</td>
            <td>Host component</td>
            <td>Remote component</td>
          </tr>
        </thead>
        <tbody>
          {/* remote */}
          <tr>
            <td>✅</td>
            <td>This component is from a remote(localhost:3006)</td>
            <td>
              <button
                style={{ marginBottom: '1rem' }}
                onClick={() => alert('Client side Javascript works!')}
              >
                Click me to test host interactive!
              </button>
            </td>
            <td>
              <Suspense loading={'loading remote for 2000ms'}>
                <Remote />
              </Suspense>
            </td>
          </tr>
          {/* nested remote */}
          <tr>
            <td>✅</td>
            <td>
              This component is from a remote(localhost:3007) which nest a
              static remote
            </td>
            <td>
              <button
                style={{ marginBottom: '1rem' }}
                onClick={() => alert('Client side Javascript works!')}
              >
                Click me to test host interactive!
              </button>
            </td>
            <td>
              <Suspense loading={'loading nested remote for 1000ms'}>
                <NestedRemote />
              </Suspense>
            </td>
          </tr>
          {/* dynamic remote */}
          <tr>
            <td>✅</td>
            <td>This component is from a dynamic remote(localhost:3008)</td>
            <td>
              <button
                style={{ marginBottom: '1rem' }}
                onClick={() => alert('Client side Javascript works!')}
              >
                Click me to test host interactive!
              </button>
            </td>
            <td>
              <DynamicRemote />
            </td>
          </tr>

          {/* dynamic nested remote */}
          <tr>
            <td>✅</td>
            <td>
              This component is from a dynamic remote(localhost:3009) which nest
              a dynamic remote
            </td>
            <td>
              <button
                style={{ marginBottom: '1rem' }}
                onClick={() => alert('Client side Javascript works!')}
              >
                Click me to test host interactive!
              </button>
            </td>
            <td>
              <DynamicNestedRemote />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Index;
