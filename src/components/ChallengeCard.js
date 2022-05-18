import React from 'react';
import { HiOutlineChevronRight } from 'react-icons/hi';
import dietImg from 'img/challengeImg/diet.jpg';
import hobbyImg from 'img/challengeImg/hobby.jpg';
import othersImg from 'img/challengeImg/others.jpg';
import routineImg from 'img/challengeImg/routine.jpg';
import selfcareImg from 'img/challengeImg/selfcare.jpg';
import studyImg from 'img/challengeImg/study.jpg';
import workoutImg from 'img/challengeImg/workout.jpg';

const ChallengeCard = ({ challengeObj }) => {
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
      case 'self-care':
        return selfcareImg;
      case 'study':
        return studyImg;
      case 'workout':
        return workoutImg;
    }
  };
  return (
    <div>
      <img src={getCategoryImg()}></img>
      <div>
        <button>{challengeObj.category}</button>
        <button>{challengeObj.frequency}</button>
        <button>{challengeObj.days}</button>
      </div>
      <div>
        <span>{challengeObj.title}</span>
        <button>
          <HiOutlineChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ChallengeCard;
