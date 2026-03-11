const mongoose = require('mongoose');

module.exports = function mapProject(project) {
	return {
		id: project._id.toString(),
		owner: project.owner.toString(),
		title: project.title,
		description: project.description,
		isArchived: project.isArchived,
		createdAt: project.createdAt,
		updatedAt: project.updatedAt,
	};
};