import React from "react";
import { SkillBar } from "./SkillBar";
import { sampleData } from "../mock-data";

export const SkillsPage = () => {
  const skills = sampleData.data.attributes.character.skills;
  
  const skillBars = Object.keys(skills).map(skill => {
    const ranks = sampleData.data.attributes.character.skills[skill];
    return <SkillBar key={skill} skill={skill} ranks={ranks}/>
  });

  return (
    <section className="skills-container">
      <div className="skill-headings">
        <h2>Skills</h2>
        <h2>Ranks</h2>
      </div>
      {skillBars}
    </section>
  );
}