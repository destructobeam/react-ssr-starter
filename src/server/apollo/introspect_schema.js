import fetch from 'isomorphic-fetch';

let data;

export const introspectSchema = async () => {
  console.log('introspectSchema called');

  if (!!data) {
    console.log('cached data exists');
    return data;
  }

  console.log('fetching new data');
  const result = await fetch(GRAPH_HTTP_PATH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      variables: {},
      query: `
        {
          __schema {
            types {
              kind
              name
              possibleTypes {
                name
              }
            }
          }
        }
      `,
    }),
  });

  const json = await result.json();
  const filteredData = json.data.__schema.types.filter(
    type => type.possibleTypes !== null
  );

  data = {
    __schema: {
      ...json.data.__schema,
      types: filteredData,
    },
  };

  return data;
};
