import dietImg from 'assets/img/challengeImg/diet.jpg';
import hobbyImg from 'assets/img/challengeImg/hobby.jpg';
import othersImg from 'assets/img/challengeImg/others.jpg';
import routineImg from 'assets/img/challengeImg/routine.jpg';
import selfcareImg from 'assets/img/challengeImg/selfcare.jpg';
import studyImg from 'assets/img/challengeImg/study.jpg';
import workoutImg from 'assets/img/challengeImg/workout.jpg';
import styles from 'styles/CategoryImg.module.css';

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
