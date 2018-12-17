1. head.js --> a. fs should be later arg.

2. lib.js --> a. seperate files can be made for functions which are handling/reading user inputs.
           b. it'd be easier to understand if the function name starts with verb, ex: 9,13 etc
           c. duplication in illegalLineCountMsg and illegalByteCountMsg.
           d. duplication in headFile & TailFile and head & tail function.

3. libTest.js  -->  a. reader function should be changed.
                    b. validater function should be changed.
                    c. some asserts can be given in seperate it blocks for diff scenarios,ex: 45, 46, +ve & -ve nos.
                    d. testcase for -ve count should be added..ex: 101
                    e. it msgs can be more specific in segregateInput tests.
