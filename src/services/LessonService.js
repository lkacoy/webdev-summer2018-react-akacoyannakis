let _singleton = Symbol();
const LESSON_MODULE_API_URL =
  'http://localhost:8080/api/course/CID/module/MID/lesson';
const LESSON_API_URL =
    'http://localhost:8080/api/lesson'

export default class LessonService {
 constructor(singletonToken) {
       if (_singleton !== singletonToken)
           throw new Error('Cannot instantiate directly.');
   }
   static get instance() {
       if(!this[_singleton])
           this[_singleton] = new LessonService(_singleton);
       return this[_singleton]
   }

   findAllLessonsForModule(courseId, moduleId) {
        return fetch(
                LESSON_MODULE_API_URL
                .replace('CID', courseId).replace('MID', moduleId))
              .then(function (response) {
                return response.json();
              })
   }

}