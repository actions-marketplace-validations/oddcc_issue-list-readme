import tablemark from 'tablemark';
import * as core from '@actions/core';
import extractBody from './extractBody';

const createTableContents = async (issues: any[]) => {
  console.log(JSON.stringify(issues));
  try {
    const array = issues.map(async (item: any) => {
      return {
        title: `<a href="${item.html_url}">${item.title}</a>`,
        tags: item.labels,
        body: await extractBody(item.body)
      };
    });

    const markDownText: string = tablemark(await Promise.all(array), {
      columns: [
        { align: 'left' },
        { align: 'center' },
        { align: 'center' },
        { align: 'left' }
      ]
    });

    return markDownText;
  } catch (error) {
    core.setFailed(error.message);
    throw error.message;
  }
};
export default createTableContents;
