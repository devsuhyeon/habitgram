import dietImg from 'img/challengeImg/diet.jpg';
import hobbyImg from 'img/challengeImg/hobby.jpg';
import othersImg from 'img/challengeImg/others.jpg';
import routineImg from 'img/challengeImg/routine.jpg';
import selfcareImg from 'img/challengeImg/selfcare.jpg';
import studyImg from 'img/challengeImg/study.jpg';
import workoutImg from 'img/challengeImg/workout.jpg';
import styles from 'assets/styles/CategoryImg.module.css';

const CategoryImg = ({ challengeObj, usage }) => {
  const getCategoryImg = () => {
    switch (challengeObj.category) {
      case 'diet':
        return dietImg;
      case 'hobby':
        return hobbyImg;
      case 'others':
        return othersImg;
      case 'routine':
        return routineImg;
      case 'selfcare':
        return selfcareImg;
      case 'study':
        return studyImg;
      case 'workout':
        return workoutImg;
      default:
    }
  };

  return (
    <img
      className={`${styles['category-img']} ${styles[usage]}`}
      src={getCategoryImg()}
      alt="categoryImg"
    ></img>
  );
};

export default CategoryImg;
