const VoteChain = require("../../../utils/blockchain");
const Vote = require("../../votes/models");
const socketIOClient = require("socket.io-client");
const ENDPOINT = "http://127.0.0.1:3000";

exports.addVote = async (req, res, next) => {
  const { info, voteTo } = req.body;
  try {
    const newVote = new Vote(info, voteTo);
    await VoteChain.addVote(newVote);
    const socket = socketIOClient(ENDPOINT);
    socket.emit("VOTE", newVote);
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

exports.getAllVotes = async (req, res, next) => {
  try {
    const votes = VoteChain.getAllVotes();
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
  const { publicKey } = req.body;
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
  const { UpdateChain } = req.body;
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
