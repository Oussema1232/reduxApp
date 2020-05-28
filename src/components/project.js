import React, { Component } from "react";
import { connect } from "react-redux";
import { loadProjects, addProject } from "../store/projects";
import Panel from "../commun/projectLayout";
import AddItem from "../commun/addItem";
import { loadBugs, bugsOfProjectSelector } from "../store/bugs";

class Projects extends Component {
  componentDidMount() {
    this.props.loadBugs();
    this.props.loadProjects();
  }

  render() {
    return (
      <div>
        {this.props.projects.map((project) => (
          <Panel
            key={project.id}
            topList={project}
            list={this.props.bugs(project.id)}
          />
        ))}
        <AddItem
          onDispatchAdd={addProject}
          name="name"
          label="Add new Project"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.entities.projects.list,
  bugs: (id) => bugsOfProjectSelector(id)(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadProjects: () => dispatch(loadProjects()),
  loadBugs: () => dispatch(loadBugs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
