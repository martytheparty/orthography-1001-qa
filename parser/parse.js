const fs = require('fs');

console.log('Begin Parsing');

const startPage = 4;
const lastPage = 79;
let currentPage = 0;
const qa = [];

fs.readFile('./raw.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    //console.log(data);
    const result = data.split(/\r?\n/);
    //console.log(result);
    result.forEach(
        (line) => {
            //console.log(line);
            if (line.startsWith("[pg"))
            {
                //console.log(line.replace(/\D/g,''));
                currentPage = line.replace(/\D/g,'');
                if (typeof currentPage === 'string')
                {
                    // console.log('current page', currentPage)
                    currentPage = parseInt(currentPage);
                }

               // console.log(typeof currentPage);
            }
//console.log(currentPage, startPage);
            if (currentPage >= startPage && currentPage <= lastPage)
            {
               // console.log('push',line);
                qa.push(line);
            }
        }
    );

    let qas = JSON.stringify(qa);
    fs.writeFileSync('raw.json', qas);

    qa.forEach(
        (questionAnswer) => {
            if (questionAnswer.startsWith("[pg"))
            {
                console.log('page',questionAnswer);
            } else {
                const q = questionAnswer.split('.');
                if (q.length > 0)
                {

                    if (typeof q[0] === 'string')
                    {
                        // console.log('current page', currentPage)
                        const currentQuestion = parseInt(q[0]);
                        if (currentQuestion && q[1])
                        {
                            console.log('question', currentQuestion, q[1]);
                        }
                        else if (questionAnswer)
                        {
                            console.log('answer', questionAnswer);
                        }
                     }
                }
            }


        }
    );


  });

