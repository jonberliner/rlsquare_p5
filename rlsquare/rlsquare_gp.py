import GPy as gp
import numpy as np
import numpy.random as rng
from numpy import array as npa

def model(X, y, num_restarts=None):
    if not num_restarts: num_restarts=1
    kg = gp.kern.RBF(input_dim=NIN, variance=1., lengthscale=1.)
    kb = gp.kern.Bias(input_dim=NIN)
    kernel = kg + kb
    m = gp.models.GPRegression(X, y, kernel)
    m.constrain_positive('')
    m.randomize()
    m.optimize_restarts(num_restarts=num_restarts)
    m.optimize(messages=False)
    return m


def draw(m, nTries=None, xBounds=None):
    if not nTries: nTries=30
    if not xBounds: xBounds = np.vstack([m.X.min(axis=0), m.X.max(axis=0)])
    xCandidates = rng.uniform(xBounds[0], xBounds[1], size=[nTries, m.input_dim])
    yhat = m.predict(xCandidates)[0]
    return xCandidates[yhat.argmax()], yhat.max()
    

if __name__ == '__main__':
    from matplotlib import pyplot as plt
    NIN = 1
    NOUT = 1
    NSAM = 6

    NUM_RESTARTS = 1

    X = rng.rand(NSAM, NIN) * 2.*np.pi
    y = np.sin(X) + rng.randn(NSAM,NOUT)*0.3

    m = model(X, y)
    m.plot()
    xhat, yhat = draw(m, 20)
    plt.plot(xhat, yhat, 'ro')
    plt.show()
