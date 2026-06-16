import * as Utils from '@contentstack/utils';
import { Stack } from './contentstack-sdk';

type GetEntry = {
  contentTypeUid: string;
  referenceFieldPath?: string[];
  jsonRtePath?: string[];
};

type GetEntryByUrl = {
  entryUrl: string | undefined;
  contentTypeUid: string;
  referenceFieldPath?: string[];
  jsonRtePath?: string[];
};

const renderOption = {
  span: (node: any, next: any) => next(node.children),
};

export const getEntry = ({
  contentTypeUid,
  referenceFieldPath,
  jsonRtePath,
}: GetEntry) => {
  return new Promise((resolve, reject) => {
    const query = Stack.ContentType(contentTypeUid).Query();
    if (referenceFieldPath) query.includeReference(referenceFieldPath);
    query
      .toJSON()
      .find()
      .then(
        (result) => {
          jsonRtePath &&
            Utils.jsonToHTML({
              entry: result,
              paths: jsonRtePath,
              renderOption,
            });
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
  });
};

export const getEntryByUrl = ({
  contentTypeUid,
  entryUrl,
  referenceFieldPath,
  jsonRtePath,
}: GetEntryByUrl) => {
  return new Promise((resolve, reject) => {
    const blogQuery = Stack.ContentType(contentTypeUid).Query();
    if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
    blogQuery.toJSON();
    const data = blogQuery.where('url', `${entryUrl}`).find();
    data.then(
      (result) => {
        jsonRtePath &&
          Utils.jsonToHTML({
            entry: result,
            paths: jsonRtePath,
            renderOption,
          });
        const entries = result?.[0];
        const entry = Array.isArray(entries) ? entries[0] : entries;
        resolve(entry || null);
      },
      (error) => {
        console.error(error);
        reject(error);
      }
    );
  });
};

export const getGlobalComponent = (contentTypeUid: string) => {
  return new Promise((resolve, reject) => {
    const query = Stack.ContentType(contentTypeUid).Query();
    query.toJSON();
    query.find().then(
      (result) => {
        const entry = result?.[0]?.[0] || null;
        resolve(entry);
      },
      (error) => {
        console.error('Error fetching contentTypeUid: ', error);
        reject(error);
      }
    );
  });
};