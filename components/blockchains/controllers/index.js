const VoteChain = require("../../../utils/blockchain");
const Vote = require("../../votes/models");

exports.addVote = async (req, res, next) => {
  const { info, voteTo } = req;
  try {
    const newVote = new Vote(info, voteTo);
    await VoteChain.addVote(newVote);

    return res.json({
      message: "Succeed",
      result: true,
    });
  } catch (error) {
    return res.json({
      message: "Failed",
      result: false,
      error,
    });
  }
};

exports.getPendingVotes = async (req, res, next) => {
  try {
    const votes = VoteChain.getPendingVotes();
    return res.json({
      message: "Succeed",
      result: true,
      votes,
    });
  } catch (error) {
    return res.json({
      message: "Failed",
      result: false,
      error,
    });
  }
};

exports.addBlock = async (req, res, next) => {
  const { publicKey } = req;
  try {
    VoteChain.addPendingVotes(publicKey);
    // Call server to clear all pending votes
    // ...

    return res.json({
      message: "Succeed",
      result: true,
    });
  } catch (error) {
    return res.json({
      message: "Failed",
      result: false,
      error,
    });
  }
};

exports.updateChain = async (req, res, next) => {
  const { UpdateChain } = req;
  try {
    if (UpdateChain.isValidChain())
      if (UpdateChain.getLength() > VoteChain.getLength()) {
        VoteChain.updateLatestChain(UpdateChain);
      }

    return res.json({
      message: "Succeed",
      result: true,
    });
  } catch (error) {
    return res.json({
      message: "Failed",
      result: false,
      error,
    });
  }
};
